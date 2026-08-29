import axios from 'axios';

export const sendEmergencyAlert = async (to: string, message: string, templateId?: string) => {
  const apiKey = process.env.CIRCUITDIGEST_API_KEY;
  if (!apiKey) {
    throw new Error('CircuitDigest API key is missing');
  }

  // Validate Indian phone number (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(to)) {
    throw new Error('Invalid Indian phone number');
  }

  try {
    const response = await axios.post(
      'https://api.circuitdigest.cloud/sms/send',
      {
        to,
        message,
        templateId
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    // Ensure proper error handling if the API key is missing or the phone number is not verified
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to send SMS via CircuitDigest');
    }
    throw new Error('Failed to send SMS: ' + error.message);
  }
};
