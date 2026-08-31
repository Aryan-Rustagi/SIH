# 🚀 SIH Developer Onboarding Guide

Welcome to the SIH project! This guide will help you get up to speed with the new design system in minutes.

---

## 📚 Quick Start (5 minutes)

### Step 1: Read the Quick Reference (2 min)
Open: `UI_UX_QUICK_REFERENCE.md`

This has all the copy-paste examples you need:
- Buttons (all variants)
- Forms (all patterns)
- Status badges
- Alerts
- Spacing utilities

### Step 2: Explore the CSS System (2 min)
Check the color variables in your DevTools:
1. Open browser DevTools (F12)
2. Open any page
3. Type in console: `getComputedStyle(document.documentElement).getPropertyValue('--teal-500')`
4. You'll see: `#14B8A6`

### Step 3: Copy-Paste Your First Component (1 min)
Find a component in `COMPONENT_EXAMPLES.md` and paste it into your code.

---

## 🎯 Essential Files to Know

| File | Purpose | When to Read |
|------|---------|--------------|
| `UI_UX_QUICK_REFERENCE.md` | Copy-paste examples | **Every day** |
| `COMPONENT_EXAMPLES.md` | Real-world patterns | When building UI |
| `UPDATED_DESIGN_SYSTEM.md` | Full documentation | When learning deep |
| `IMPLEMENTATION_CHECKLIST.md` | QA checklist | Before submitting PR |

---

## 🎨 Color System Crash Course

### The Main Colors
```
🟦 Navy (#0F172A)    - Dark backgrounds, primary text
🟦 Teal (#14B8A6)    - Buttons, highlights, primary actions
🟩 Emerald (#10B981) - Success states, positive actions
🟥 Red (#E53E3E)     - Danger, errors, deletions
🟨 Amber (#F59E0B)   - Warnings, cautions
🟦 Sky (#0EA5E9)     - Info, secondary actions
```

### Use CSS Variables
```tsx
<!-- ✅ CORRECT -->
<button class="btn btn-primary">Click</button>

<!-- ✅ ALSO CORRECT -->
<div style={{ color: 'var(--teal-500)' }}>
  Text in teal
</div>

<!-- ❌ WRONG -->
<button style={{ background: '#14B8A6' }}>Click</button>
```

**Why?** Variables stay consistent. If we change colors globally, everything updates automatically.

---

## 🔘 Common Button Patterns

### Copy-Paste These

```tsx
// Primary action (most common)
<button class="btn btn-primary">Save</button>

// Secondary action (cancel, back)
<button class="btn btn-secondary">Cancel</button>

// Dangerous action (delete)
<button class="btn btn-danger">Delete</button>

// Full width (on mobile forms)
<button class="btn btn-primary btn-block">Full Width</button>

// Larger button
<button class="btn btn-primary btn-lg">Large</button>
```

---

## 📝 Forms: Best Practices

### Correct Form Structure
```tsx
<form class="flex flex-col gap-4">
  <!-- Email input -->
  <div>
    <label class="label">Email Address</label>
    <input type="email" class="input" placeholder="you@example.com" />
  </div>

  <!-- Password input -->
  <div>
    <label class="label">Password</label>
    <input type="password" class="input" placeholder="••••••••" />
  </div>

  <!-- Submit button -->
  <button type="submit" class="btn btn-primary btn-block">
    Sign In
  </button>
</form>
```

**Key points:**
- Use `<label>` with `class="label"`
- Inputs always have `class="input"`
- Forms use `flex flex-col gap-4` for spacing
- Buttons use `btn-block` for full width

---

## 🏷️ Status Indicators

### Safe, Caution, Danger

```tsx
// ✅ Safe (green)
<span class="badge badge-safe">✓ Safe</span>

// ⚠ Caution (amber)
<span class="badge badge-caution">⚠ Caution</span>

// ✕ Danger (red)
<span class="badge badge-danger">✕ Danger</span>
```

**Real-world example:**
```tsx
<div class="flex items-center gap-2">
  <span class="status-dot safe"></span>
  <span class="font-semibold">Zone is Safe</span>
</div>
```

---

## 📐 Spacing: The System

### The Scale (memorize this!)
```
4px  = --s-1  or gap-1  or mt-xs
8px  = --s-2  or gap-2  or mt-sm
12px = --s-3  or gap-3  
16px = --s-4  or gap-4  or mt-md
24px = --s-6  or gap-6  or mt-lg
```

### Usage
```tsx
<!-- Margin top -->
<div class="mt-md">This has 16px margin-top</div>

<!-- Margin bottom -->
<div class="mb-lg">This has 24px margin-bottom</div>

<!-- Gap between flex items -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Padding using variables -->
<div style={{ padding: 'var(--s-6)' }}>
  Padded content
</div>
```

---

## 🎴 Cards: 3 Types

### Type 1: Basic Card
```tsx
<div class="card">
  <h3 class="text-lg font-bold">Title</h3>
  <p class="text-secondary">Description</p>
</div>
```
Use for: Regular content containers

### Type 2: Interactive Card (Clickable)
```tsx
<div class="card card-interactive" onclick="navigate()">
  <h3 class="text-lg font-bold">Click me</h3>
</div>
```
Use for: Menu items, navigation cards, selections

### Type 3: Highlighted Card (Important!)
```tsx
<div class="card card-glow">
  <h3 class="text-lg font-bold text-teal">Important</h3>
</div>
```
Use for: Alerts, important info, emphasis

---

## 📱 Responsive Tips

### Desktop
```tsx
<div class="grid grid-4 gap-4">
  {/* 4 items wide */}
</div>
```

### Mobile
Same code automatically becomes:
```tsx
<div class="grid grid-4 gap-4">
  {/* Stacks to 1 column on mobile */}
</div>
```

### Hide/Show by Device
```tsx
<!-- Only show on mobile -->
<div class="hidden-desktop">Mobile Menu</div>

<!-- Only show on desktop -->
<nav class="hidden-mobile">Desktop Nav</nav>
```

---

## ✅ Before Submitting Code

### Checklist
- [ ] Buttons have `class="btn btn-*"`
- [ ] Forms have labels with `class="label"`
- [ ] No hardcoded colors (use variables)
- [ ] Spacing uses the scale (gap-4, mt-md)
- [ ] Cards use `.card` class
- [ ] Alerts use `.alert .alert-success` etc.
- [ ] Mobile looks good (test at 375px width)
- [ ] No console errors
- [ ] Keyboard works (Tab to navigate)

---

## 🐛 Common Issues & Fixes

### Issue: Button too small on mobile
**Fix:** Add `btn-lg` class
```tsx
<button class="btn btn-primary btn-lg">Better</button>
```

### Issue: Text overlapping
**Fix:** Add proper spacing
```tsx
<div class="flex flex-col gap-4">
  <div>Text 1</div>
  <div>Text 2</div>
</div>
```

### Issue: Colors not showing
**Fix:** Use CSS variables
```tsx
<!-- ❌ Won't work -->
<div style={{ color: '#14b8a6' }}>Text</div>

<!-- ✅ Use this -->
<div style={{ color: 'var(--teal-500)' }}>Text</div>
<!-- OR -->
<div class="text-teal-500">Text</div>
```

### Issue: Not mobile responsive
**Fix:** Test actual sizes (not just browser zoom)
```
Use DevTools: Ctrl+Shift+M (or Cmd+Shift+M on Mac)
Test at 375px width (iPhone SE)
```

---

## 🎬 Animation Examples

### Add to any element
```tsx
<!-- Fade in -->
<div style={{ animation: 'fadeIn 0.5s ease-out' }}>
  Content
</div>

<!-- Slide up -->
<div style={{ animation: 'slideUp 0.4s ease-out' }}>
  Content
</div>

<!-- Scale in -->
<div style={{ animation: 'scaleIn 0.3s ease-out' }}>
  Content
</div>
```

**Use sparingly!** Only for important user feedback.

---

## 💡 Pro Tips

### Tip 1: Inspect the Tourist Safety App
Open the original project and use DevTools. See how components are structured.

### Tip 2: Use Utility Classes
```tsx
<!-- ✅ Use utilities -->
<div class="flex items-center justify-between gap-4">

<!-- ❌ Avoid inline styles -->
<div style={{ display: 'flex', alignItems: 'center', ... }}>
```

### Tip 3: Component Reusability
Create small, reusable components:
```tsx
// Badge component
function StatusBadge({ status }) {
  return <span class={`badge badge-${status}`}>{status}</span>;
}

// Use it
<StatusBadge status="safe" />
```

### Tip 4: Keyboard Testing
Just use Tab key to navigate. Make sure:
- All buttons are focusable
- Focus is visible (teal ring)
- Tab order makes sense

---

## 📞 Quick Reference

### What does this class do?

| Class | Does | Example |
|-------|------|---------|
| `.btn` | Creates button | `<button class="btn">` |
| `.btn-primary` | Teal button | `<button class="btn btn-primary">` |
| `.btn-block` | Full width | `<button class="btn-block">` |
| `.card` | Container box | `<div class="card">` |
| `.input` | Text field | `<input class="input">` |
| `.label` | Form label | `<label class="label">` |
| `.badge` | Status tag | `<span class="badge">` |
| `.alert` | Message box | `<div class="alert">` |
| `.gap-4` | 16px space | `<div class="gap-4">` |
| `.text-lg` | 18px text | `<p class="text-lg">` |

---

## 🎓 Learning Path

### Day 1: Get Oriented (1 hour)
1. Read this guide (10 min)
2. Read `UI_UX_QUICK_REFERENCE.md` (20 min)
3. Copy-paste a button component (10 min)
4. Copy-paste a form component (10 min)
5. Test on mobile (10 min)

### Day 2: Build a Page (2 hours)
1. Create a dashboard card grid
2. Add a form with validation
3. Add status indicators
4. Test keyboard navigation
5. Check mobile responsiveness

### Day 3+: Master the System (ongoing)
- Reference `COMPONENT_EXAMPLES.md` for patterns
- Use `IMPLEMENTATION_CHECKLIST.md` before PRs
- Ask questions if stuck!

---

## 🚀 You're Ready!

You now know:
- ✅ Where to find examples
- ✅ How to use colors (CSS variables)
- ✅ How to build buttons, forms, cards
- ✅ How to space things correctly
- ✅ How to make it responsive
- ✅ How to test it

**Start coding! 🎉**

When in doubt:
1. Check `UI_UX_QUICK_REFERENCE.md`
2. Look at `COMPONENT_EXAMPLES.md`
3. Use `IMPLEMENTATION_CHECKLIST.md` before submitting

---

## 📞 Still Have Questions?

- **Colors?** Check the color section above
- **Components?** See `COMPONENT_EXAMPLES.md`
- **Spacing?** Follow the 4-8-12-16-24px scale
- **Accessibility?** Use semantic HTML, test keyboard
- **Responsive?** Test at 375px, 768px, 1024px widths
- **Performance?** Use CSS variables, minimize inline styles

You've got this! 🚀