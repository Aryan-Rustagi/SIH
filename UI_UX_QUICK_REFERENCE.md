# SIH UI/UX Quick Reference

## 🎨 Color Quick-Pick

```
Primary:  #14B8A6 (Teal) - Actions, highlights
Dark:     #0F172A (Navy) - Text, dark backgrounds
Light:    #F8FAFC (Off-white) - Page background

Success:  #10B981 (Emerald)
Danger:   #E53E3E (Red)
Warning:  #F59E0B (Amber)
Info:     #0EA5E9 (Sky)
```

Use CSS variables: `var(--teal-500)`, `var(--navy-900)`, etc.

---

## 🔘 Common Button Patterns

### Primary Action
```tsx
<button class="btn btn-primary">Save</button>
<button class="btn btn-primary btn-lg">Large Primary</button>
```

### Secondary Action
```tsx
<button class="btn btn-secondary">Cancel</button>
```

### Danger Action
```tsx
<button class="btn btn-danger">Delete</button>
```

### Full Width (Mobile)
```tsx
<button class="btn btn-primary btn-block">Full Width</button>
```

---

## 📝 Form Patterns

### Text Input
```tsx
<div class="input-group">
  <input type="text" class="input" placeholder="Enter..." />
</div>
```

### Text Area
```tsx
<textarea class="input" placeholder="Your message..."></textarea>
```

### With Icon
```tsx
<div class="input-group">
  <input type="email" class="input input-with-icon" />
  <span class="input-icon">📧</span>
</div>
```

---

## 🏷️ Status & Status Badges

### Status Badge
```tsx
<span class="badge badge-safe">✓ Safe</span>
<span class="badge badge-caution">⚠ Caution</span>
<span class="badge badge-danger">✕ Danger</span>
```

### Status Dot
```tsx
<span class="status-dot safe"></span>
<span class="status-dot caution"></span>
<span class="status-dot danger"></span>
```

---

## 🎴 Card Patterns

### Basic Card
```tsx
<div class="card">
  <h3 class="text-lg font-bold mb-md">Title</h3>
  <p class="text-secondary">Description</p>
</div>
```

### Interactive Card (Clickable)
```tsx
<div class="card card-interactive" onclick="handleClick()">
  <h3 class="text-lg font-bold">Clickable Card</h3>
</div>
```

### Highlighted Card
```tsx
<div class="card card-glow">
  <h3 class="text-lg font-bold text-teal">Important Info</h3>
</div>
```

---

## ⚠️ Alert Patterns

### Success Alert
```tsx
<div class="alert alert-success">
  ✓ Operation completed successfully
</div>
```

### Error Alert
```tsx
<div class="alert alert-error">
  ✕ An error occurred. Please try again.
</div>
```

### Warning Alert
```tsx
<div class="alert alert-warning">
  ⚠ Please review before proceeding
</div>
```

### Info Alert
```tsx
<div class="alert alert-info">
  ℹ New information available
</div>
```

---

## 📐 Spacing Quick Reference

| Class | Pixels | Use |
|-------|--------|-----|
| `.gap-1` | 4px | Minimal spacing |
| `.gap-2` | 8px | Small gaps |
| `.gap-4` | 16px | Standard gaps |
| `.gap-6` | 24px | Section spacing |
| `.mb-md` | 16px | Bottom margin |
| `.mt-lg` | 24px | Top margin |
| `.p-1` | 4px | Padding |
| `.px-4` | 16px L/R | Horizontal padding |

---

## 🎬 Animation Classes

Add `style="animation: fadeInUp 0.6s ease-out"` to elements for effects:

- `fadeIn` - Fade in (0.5s)
- `fadeInUp` - Fade + slide up (0.6s)
- `slideUp` - Slide up (0.4s)
- `slideDown` - Slide down (0.3s)
- `scaleIn` - Scale + fade (0.3s)

---

## 📱 Mobile-Friendly Patterns

### Touch Button (Minimum 44px)
```tsx
<button class="btn btn-primary">Tap Me</button>
<!-- Automatically 44px minimum height -->
```

### Bottom Navigation
```tsx
<nav class="mobile-nav">
  <a href="#" class="nav-item active">Home</a>
  <a href="#" class="nav-item">Settings</a>
</nav>
```

### Floating Action Button
```tsx
<button class="fab">+</button>
<!-- Fixed position bottom-right -->
```

### Full-Width Card
```tsx
<div class="card">
  <!-- Automatically responsive -->
</div>
```

---

## 🔍 Typography Classes

### Headings
```tsx
<h1 class="text-3xl font-bold">Large Title</h1>
<h2 class="text-2xl font-bold">Section</h2>
<h3 class="text-lg font-semibold">Subsection</h3>
```

### Text Sizes
```tsx
<p class="text-sm">Small (12px)</p>
<p class="text-base">Normal (16px)</p>
<p class="text-lg">Large (18px)</p>
```

### Text Colors
```tsx
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-muted">Muted text</p>
```

### Font Weights
```tsx
<p class="font-medium">Medium</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>
```

---

## 🌐 Layout Helpers

### Container (Max Width)
```tsx
<div class="container">
  <!-- Max 1200px, centered -->
</div>
```

### Flex Grid
```tsx
<div class="grid grid-2 gap-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
</div>
<!-- 2 cols on desktop, 1 on mobile -->
```

### Flex Helpers
```tsx
<div class="flex items-center justify-between gap-4">
  <!-- Flex layout with spacing -->
</div>
```

---

## ♿ Accessibility Tips

1. **Always use semantic HTML**
   ```tsx
   <button> <!-- not <div onclick> -->
   <a href=""> <!-- not <span onclick> -->
   ```

2. **Add labels to inputs**
   ```tsx
   <label>Email</label>
   <input type="email" />
   ```

3. **Use alt text for images**
   ```tsx
   <img src="icon.png" alt="Description" />
   ```

4. **Keyboard navigation**
   - All buttons/links are keyboard accessible
   - Tab order follows DOM order

5. **Color contrast**
   - Text: 4.5:1 minimum
   - UI: 3:1 minimum

---

## 💡 Common Patterns

### Loading State
```tsx
<button class="btn btn-primary" disabled>
  Loading...
</button>
```

### Empty State
```tsx
<div class="text-center mt-12">
  <p class="text-muted">No items found</p>
</div>
```

### Confirmation Dialog
```tsx
<div class="card card-glow">
  <h3 class="text-lg font-bold mb-md">Confirm Action?</h3>
  <div class="flex gap-2">
    <button class="btn btn-secondary flex-1">Cancel</button>
    <button class="btn btn-danger flex-1">Delete</button>
  </div>
</div>
```

### Form Layout
```tsx
<form class="flex flex-col gap-4">
  <div>
    <label>Field Label</label>
    <input type="text" class="input" />
  </div>
  <button type="submit" class="btn btn-primary btn-block">
    Submit
  </button>
</form>
```

---

## 🚀 Performance Tips

1. **Use CSS variables** instead of inline styles
2. **Lazy load** images and heavy components
3. **Minimize animations** on mobile devices
4. **Use fixed heights** for buttons to prevent layout shift
5. **Test on real devices** (not just desktop browsers)

---

## 📚 Full Documentation

See `UPDATED_DESIGN_SYSTEM.md` for complete reference