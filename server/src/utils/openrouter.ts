import OpenAI from 'openai';

/* ─────────────────────────────────────────────────────────
   Lazy-initialized OpenRouter client.
   Must be lazy because dotenv loads AFTER module imports.
───────────────────────────────────────────────────────── */
let client: OpenAI;
const getClient = () => {
  if (!client) {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      console.error('[OpenRouter] WARNING: OPENROUTER_API_KEY is not set!');
    }
    client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: key || 'missing-key',
    });
  }
  return client;
};

/* ─────────────────────────────────────────────────────────
   Free model fallback chain – tried in priority order.
   All models are completely FREE on OpenRouter.
───────────────────────────────────────────────────────── */
const FALLBACK_MODELS = [
  'deepseek/deepseek-r1-0528:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-coder:free',
  'google/gemma-3-27b-it:free',
];

const localSafetyReply = (message: string) => {
  const normalized = message.toLowerCase();
  if (normalized.includes('emergency') || normalized.includes('danger') || normalized.includes('help')) {
    return 'If you are in immediate danger, move to a public place, share your location with a trusted contact, and call 112 now. For tourist assistance, call 1363. Tell me what happened and whether you are injured.';
  }
  if (normalized.includes('first aid') || normalized.includes('injur') || normalized.includes('bleed')) {
    return 'For serious injury, call 112. Apply firm pressure to bleeding with clean cloth, do not move someone with a possible spine injury, and stay with them until responders arrive.';
  }
  if (normalized.includes('lost') || normalized.includes('route')) {
    return 'Stay where other people can see you, avoid isolated shortcuts, share your live location, and contact 112 or 1363 if you feel unsafe.';
  }
  return 'I can help with emergency steps, first aid, getting lost, and tourist safety. For immediate danger, call 112 first. What is happening right now?';
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends a chat request using an explicit fallback loop over multiple free models.
 * If ALL models fail, returns a safe hardcoded emergency response.
 */
export const sendChatWithFallback = async (history: any[], contextStr: string) => {
  const userMessage = history.find((item) => item.role === 'user')?.content || '';
  if (!process.env.OPENROUTER_API_KEY) {
    return { role: 'assistant', content: localSafetyReply(userMessage) };
  }

  const messages = [
    { role: 'system', content: contextStr },
    ...history
  ];

  for (let i = 0; i < FALLBACK_MODELS.length; i++) {
    const currentModel = FALLBACK_MODELS[i];
    try {
      console.log(`[OpenRouter] Trying model ${i + 1}/${FALLBACK_MODELS.length}: ${currentModel}`);

      const response = await getClient().chat.completions.create({
        model: currentModel,
        messages: messages as any,
      });

      const reply = response.choices[0]?.message?.content;
      if (!reply) throw new Error('Empty response from model');

      console.log(`[OpenRouter] ✅ Success with: ${currentModel}`);
      return response.choices[0].message;

    } catch (error: any) {
      console.error(`[OpenRouter] ❌ Failed: ${currentModel} → ${error.message}`);

      if (i < FALLBACK_MODELS.length - 1) {
        await delay(500);
      }
    }
  }

  // Safe fallback response if ALL models fail
  console.error('[OpenRouter] All models failed. Returning emergency fallback.');
  return {
    role: 'assistant',
    content: localSafetyReply(userMessage)
  };
};
