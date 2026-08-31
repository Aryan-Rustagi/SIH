# 🎨 SIH Design System - Visual Quick Guide

## 🎯 At a Glance

Your SIH project now has a **professional, modern design system** with everything a team needs to build consistent, beautiful interfaces.

---

## 🔴 🟡 🟢 🔵 Color System

### Primary Colors
```
🟦 Navy (#0F172A)    → Backgrounds, primary text, sidebar
🟦 Teal (#14B8A6)    → Primary buttons, highlights, CTAs
🟩 Emerald (#10B981) → Success, positive actions
🟥 Red (#E53E3E)     → Danger, errors, deletions
🟨 Amber (#F59E0B)   → Warnings, cautions
🟦 Sky (#0EA5E9)     → Info, secondary actions
```

### Usage
```tsx
<button class="btn btn-primary">Teal button (primary action)</button>
<button class="btn btn-secondary">Sky button (secondary)</button>
<button class="btn btn-danger">Red button (dangerous)</button>
```

---

## 🔘 Buttons - All Variants

### Styles
```
Primary   → Teal background (main actions)
Secondary → Gray background (alternative actions)
Danger    → Red background (deletions)
Ghost     → Transparent (subtle actions)
Outline   → Border only (tertiary actions)
```

### Sizes
```
Normal  → 44px height (default)
Large   → 48px height (emphasis)
Small   → 36px height (compact)
Block   → 100% width (mobile forms)
```

### Examples
```tsx
<button class="btn btn-primary">Primary</button>
<button class="btn btn-primary btn-lg">Large Primary</button>
<button class="btn btn-primary btn-block">Full Width</button>
<button class="btn btn-danger">Delete</button>
```

---

## 📝 Forms

### Complete Form Example
```tsx
<form class="flex flex-col gap-4">
  {/* Text input */}
  <div>
    <label class="label">Full Name</label>
    <input type="text" class="input" placeholder="John Doe" />
  </div>

  {/* Email input */}
  <div>
    <label class="label">Email</label>
    <input type="email" class="input" placeholder="john@example.com" />
  </div>

  {/* Password input */}
  <div>
    <label class="label">Password</label>
    <input type="password" class="input" placeholder="••••••••" />
  </div>

  {/* Submit button */}
  <button type="submit" class="btn btn-primary btn-block">
    Sign In
  </button>
</form>
```

### Form Input with Icon
```tsx
<div class="input-group">
  <span class="input-icon">📧</span>
  <input type="email" class="input" placeholder="your@email.com" />
</div>
```

---

## 🎴 Cards

### Type 1: Basic Card
```tsx
<div class="card">
  <h3 class="text-lg font-bold">Card Title</h3>
  <p class="text-secondary">Card description</p>
</div>
```
Use for: Content containers, information display

### Type 2: Interactive Card
```tsx
<div class="card card-interactive" onclick="navigate()">
  <h3 class="text-lg font-bold">Click Me</h3>
  <p>This card responds to clicks</p>
</div>
```
Use for: Menu items, selections, navigation

### Type 3: Highlighted Card
```tsx
<div class="card card-glow">
  <h3 class="text-lg font-bold text-teal">Important</h3>
  <p>Important information</p>
</div>
```
Use for: Alerts, important info, emphasis

---

## 🏷️ Status & Badges

### Status Indicators
```tsx
<!-- Safe (green) -->
<span class="badge badge-safe">✓ Safe</span>

<!-- Caution (amber) -->
<span class="badge badge-caution">⚠ Caution</span>

<!-- Danger (red) -->
<span class="badge badge-danger">✕ Danger</span>
```

### Color Badges
```tsx
<span class="badge badge-rose">Rose</span>
<span class="badge badge-emerald">Emerald</span>
<span class="badge badge-amber">Amber</span>
<span class="badge badge-sky">Sky</span>
<span class="badge badge-navy">Navy</span>
<span class="badge badge-teal">Teal</span>
```

### Status Dots
```tsx
<div class="flex items-center gap-2">
  <span class="status-dot safe"></span>
  <span>Safe Zone</span>
</div>

<div class="flex items-center gap-2">
  <span class="status-dot danger"></span>
  <span>Danger Zone</span>
</div>
```

---

## 🚨 Alerts

### All Types
```tsx
<!-- Success alert -->
<div class="alert alert-success">
  ✓ Operation completed successfully!
</div>

<!-- Error alert -->
<div class="alert alert-error">
  ✕ Something went wrong. Please try again.
</div>

<!-- Warning alert -->
<div class="alert alert-warning">
  ⚠ Please verify your information.
</div>

<!-- Info alert -->
<div class="alert alert-info">
  ℹ You have a new message.
</div>
```

### Dismissible Alert
```tsx
<div class="alert alert-success" id="alert">
  ✓ Success!
  <button onclick="document.getElementById('alert').remove()">×</button>
</div>
```

---

## 📐 Spacing Scale

### Memory This!
```
4px  = gap-1  or --s-1
8px  = gap-2  or --s-2
12px = gap-3  or --s-3
16px = gap-4  or --s-4  (MOST COMMON)
24px = gap-6  or --s-6
32px = gap-8  or --s-8
```

### Usage
```tsx
<!-- Margin -->
<div class="mt-md">16px margin-top</div>
<div class="mb-lg">24px margin-bottom</div>

<!-- Flex gap -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Grid gap -->
<div class="grid gap-6">
  <div>Grid item 1</div>
  <div>Grid item 2</div>
</div>
```

---

## 📱 Responsive Layouts

### Grid Layouts
```tsx
<!-- 4 columns on desktop, responsive on mobile -->
<div class="grid grid-4 gap-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
  <div class="card">Item 4</div>
</div>

<!-- 3 columns -->
<div class="grid grid-3 gap-4">
  {/* 3 items */}
</div>

<!-- 2 columns -->
<div class="grid grid-2 gap-4">
  {/* 2 items */}
</div>
```

### Show/Hide by Device
```tsx
<!-- Only on mobile -->
<div class="hidden-desktop">
  <MobileMenu />
</div>

<!-- Only on desktop -->
<nav class="hidden-mobile">
  <DesktopNav />
</nav>
```

### Responsive Spacing
```tsx
<!-- Changes size on different screens -->
<div class="container">
  <h1 class="text-3xl md:text-5xl">Responsive heading</h1>
  <p class="mt-4 md:mt-8">Text with responsive margins</p>
</div>
```

---

## 🔤 Typography

### Sizes
```
h1 / .text-5xl → 2.75rem (44px)
h2 / .text-4xl → 2.25rem (36px)
h3 / .text-3xl → 1.875rem (30px)
h4 / .text-2xl → 1.5rem (24px)
p  / .text-base → 1rem (16px)
.text-sm → 0.875rem (14px)
.text-xs → 0.75rem (12px)
```

### Weights
```
font-light    → 300 (thin text)
font-normal   → 400 (default)
font-semibold → 600 (slightly bold)
font-bold     → 700 (very bold)
font-black    → 900 (extremely bold)
```

### Examples
```tsx
<h1 class="text-5xl font-bold">Page Title</h1>
<h2 class="text-3xl font-semibold">Section Title</h2>
<p class="text-base font-normal">Normal paragraph</p>
<p class="text-sm font-light">Small light text</p>
```

---

## ✨ Animations

### Available
```
fadeIn      → Fade from transparent
slideUp     → Slide up from bottom
slideDown   → Slide down from top
scaleIn     → Grow from center
shimmer     → Shimmer loading effect
pulseGlow   → Pulse glow effect
float       → Floating motion
bounceSlow  → Bouncing motion
```

### Usage
```tsx
<div style={{ animation: 'fadeIn 0.5s ease-out' }}>
  Fades in smoothly
</div>

<div style={{ animation: 'slideUp 0.4s ease-out' }}>
  Slides up on load
</div>

<div style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}>
  Pulsing glow
</div>
```

---

## 📊 Layout Patterns

### Dashboard Layout
```tsx
<div class="dashboard-shell">
  <aside class="dashboard-sidebar">
    {/* Navigation menu */}
  </aside>
  <main class="dashboard-content">
    {/* Main content */}
  </main>
</div>
```

### Card Grid
```tsx
<div class="grid grid-3 gap-6">
  <div class="card">
    <div class="stat-label">Total Users</div>
    <div class="stat-value">1,234</div>
  </div>
  
  <div class="card">
    <div class="stat-label">Active Today</div>
    <div class="stat-value">567</div>
  </div>
  
  <div class="card">
    <div class="stat-label">Safety Rate</div>
    <div class="stat-value">98.5%</div>
  </div>
</div>
```

### Mobile Layout
```tsx
<div class="mobile-app">
  <div class="scrollable-content">
    {/* Main content scrolls */}
  </div>
  <nav class="mobile-nav">
    <a class="nav-item">Home</a>
    <a class="nav-item">Search</a>
    <a class="nav-item">Profile</a>
  </nav>
</div>
```

---

## ✅ Before You Submit Code

### Checklist
```
☐ Buttons have class="btn btn-*"
☐ Forms have labels with class="label"
☐ No hardcoded colors (use CSS variables)
☐ Spacing uses the scale (gap-4, mt-md)
☐ Cards use .card class
☐ Mobile design works (test at 375px)
☐ Keyboard navigation works (press Tab)
☐ No console errors
☐ Colors have proper contrast
☐ Touch targets are 44px+ (mobile)
```

---

## 🚀 Copy-Paste Templates

### Basic Page
```tsx
<div class="container">
  <h1 class="text-5xl font-bold mb-lg">Page Title</h1>
  <p class="text-lg text-secondary mb-lg">Description</p>
  
  <div class="grid grid-2 gap-6">
    <div class="card">
      <h3 class="text-2xl font-semibold">Feature 1</h3>
      <p class="text-secondary mt-4">Description</p>
    </div>
    
    <div class="card">
      <h3 class="text-2xl font-semibold">Feature 2</h3>
      <p class="text-secondary mt-4">Description</p>
    </div>
  </div>
</div>
```

### Login Form
```tsx
<div class="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
  <h2 class="text-3xl font-bold mb-lg">Sign In</h2>
  
  <form class="flex flex-col gap-4">
    <div>
      <label class="label">Email</label>
      <input type="email" class="input" placeholder="you@example.com" />
    </div>
    
    <div>
      <label class="label">Password</label>
      <input type="password" class="input" placeholder="••••••••" />
    </div>
    
    <button type="submit" class="btn btn-primary btn-block">
      Sign In
    </button>
  </form>
</div>
```

---

## 🎓 Learning Path

### Day 1 (30 minutes)
1. Read this guide (5 min)
2. Read DEVELOPER_ONBOARDING.md (10 min)
3. Copy-paste a button (5 min)
4. Copy-paste a form (10 min)

### Day 2 (1 hour)
1. Build a card grid
2. Add a form with validation
3. Add status indicators
4. Test on mobile

### Day 3+ (ongoing)
1. Reference COMPONENT_EXAMPLES.md
2. Use IMPLEMENTATION_CHECKLIST.md
3. Ask questions!

---

## 📞 Quick Help

**How do I use colors?**
- Use classes: `class="text-teal-500"`
- Or variables: `style={{ color: 'var(--teal-500)' }}`

**How do I make it mobile?**
- Design mobile-first
- Use responsive grid: `grid-2 grid-3 grid-4`
- Test at 375px width

**How do I add spacing?**
- Use gap: `gap-4` (16px)
- Use margin: `mt-md` (16px)
- Use padding: via CSS variables

**Where do I find examples?**
- Check COMPONENT_EXAMPLES.md
- Check QUICK_REFERENCE.md
- Check this guide!

---

## 🎊 You're Ready!

Everything you need is:
1. ✅ Documented
2. ✅ Organized
3. ✅ Ready to use

**Start building! 🚀**