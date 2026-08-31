# SIH - Smart India Hackathon: Modern Design System

## 🎨 Design Philosophy

This design system provides a **modern, professional, and consistent UI/UX** across the entire SIH application. Built on the proven design patterns from the Tourist Safety App, it emphasizes clarity, accessibility, and usability.

### Core Principles
- **Clean & Professional**: Minimal design with maximum clarity
- **Accessible**: WCAG compliant, keyboard navigable, semantic HTML
- **Mobile-First**: Optimized for all screen sizes
- **Performant**: Fast load times, smooth animations, efficient CSS
- **Consistent**: Unified component library and spacing system

---

## 📐 Color Palette

### Primary Colors
- **Teal**: `#14B8A6` - Primary actions, highlights, success states
- **Navy**: `#0F172A` - Dark backgrounds, primary text
- **Slate**: `#94A3B8` - Secondary text, borders, subtle UI

### Semantic Colors
| Purpose | Light | Main | Dark |
|---------|-------|------|------|
| **Success** | `#D1FAE5` | `#10B981` | `#059669` |
| **Danger** | `#FEE2E2` | `#E53E3E` | `#B91C1C` |
| **Warning** | `#FEF3C7` | `#F59E0B` | `#D97706` |
| **Info** | `#E0F2FE` | `#0EA5E9` | `#0284C7` |

### Neutral Palette
```
Navy:   50  100  200  300  400  500  600  700  800  900  950
                Light ↑              ↓ Dark
```

---

## 🔤 Typography System

### Font Family
- **Sans-serif**: Inter (body text, UI labels)
- **Monospace**: JetBrains Mono (code, technical content)

### Type Scale
| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `h1` | 2.75rem | 800 | Page title |
| `h2` | 1.875rem | 700 | Section heading |
| `h3` | 1.125rem | 700 | Subsection |
| `.text-lg` | 1.125rem | 400 | Large body |
| `.text-base` | 1rem | 400 | Standard body |
| `.text-sm` | 0.875rem | 400 | Small text |
| `.text-xs` | 0.75rem | 500 | Captions, labels |

### Font Weights
- **400**: Regular (body text)
- **500**: Medium (labels)
- **600**: Semibold (buttons, callouts)
- **700**: Bold (headings)
- **800**: Extrabold (hero titles)
- **900**: Black (emphasis)

---

## 🎯 Component Library

### Buttons

#### Variants
```tsx
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-ghost">Ghost</button>
```

#### Sizes
- `.btn-sm` - 36px height, small padding
- `.btn` (default) - 44px height
- `.btn-lg` - 48px height, large padding

#### Attributes
- `.btn-block` - Full width
- `:disabled` - Opacity 50%, no cursor

### Cards

```tsx
<div class="card">
  <!-- Content -->
</div>

<div class="card card-interactive">
  <!-- Clickable content -->
</div>

<div class="card card-glow">
  <!-- Highlighted card with glow effect -->
</div>
```

**Features:**
- Default shadow and border
- Hover effects (scale, shadow increase)
- Interactive variant with tap feedback

### Badges

```tsx
<span class="badge badge-safe">Safe</span>
<span class="badge badge-caution">Caution</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
```

### Forms

#### Inputs
```tsx
<input 
  type="text" 
  class="input" 
  placeholder="Enter text..."
/>
```

**Features:**
- Min height 44px (mobile friendly)
- Teal focus ring
- Clear placeholder styling
- Full width by default

#### Form Structure
```tsx
<div class="input-group">
  <input type="text" class="input input-with-icon" />
  <span class="input-icon">🔍</span>
</div>
```

### Badges & Status Indicators

```tsx
<span class="status-dot safe"></span>
<span class="status-dot caution"></span>
<span class="status-dot danger"></span>
```

### Alert Banners

```tsx
<div class="alert alert-success">
  <span>✓</span> Operation completed successfully
</div>
```

Available: `.alert-success`, `.alert-error`, `.alert-warning`, `.alert-info`

---

## 📐 Spacing System

### Scale (CSS Variables)
```css
--s-1:  0.25rem   (4px)
--s-2:  0.5rem    (8px)
--s-3:  0.75rem   (12px)
--s-4:  1rem      (16px)
--s-5:  1.25rem   (20px)
--s-6:  1.5rem    (24px)
--s-8:  2rem      (32px)
--s-10: 2.5rem    (40px)
--s-12: 3rem      (48px)
--s-16: 4rem      (64px)
--s-20: 5rem      (80px)
```

### Usage Classes
- `.gap-1` through `.gap-8` - Flex/grid gap
- `.mt-xs` / `.mt-sm` / `.mt-md` / `.mt-lg` / `.mt-xl` - Margin top
- `.mb-xs` / `.mb-sm` / `.mb-md` / `.mb-lg` / `.mb-xl` - Margin bottom
- `.p-1` / `.px-4` / `.py-3` - Padding

---

## 🎬 Animations

### Keyframe Animations
- `fadeIn` - 0.5s ease-out
- `fadeInUp` - 0.6s ease-out (fade + slide up)
- `slideUp` - 0.4s cubic-bezier motion
- `slideDown` - 0.3s ease-out
- `scaleIn` - 0.3s cubic-bezier (fade + scale)
- `shimmer` - 2s loop (loading effect)
- `pulseGlow` - 2s loop (opacity pulse)
- `float` - 6s loop (subtle floating motion)

### Usage
```tsx
<div style="animation: fadeInUp 0.6s ease-out;">Content</div>
```

---

## 🔄 Layout Patterns

### Dashboard Layout (Admin/Dashboard)
```tsx
<div class="dashboard-shell">
  <aside class="dashboard-sidebar">
    <!-- Navigation -->
  </aside>
  <main class="dashboard-content">
    <!-- Page content -->
  </main>
</div>
```

**Sidebar**: 256px fixed, dark gradient background
**Content**: Full width minus sidebar

### Mobile-First Layout (Field App)
```tsx
<div class="app-wrapper">
  <main class="scrollable-content">
    <!-- Page content -->
  </main>
  <nav class="mobile-nav">
    <!-- Bottom navigation -->
  </nav>
</div>
```

**Bottom Nav**: Fixed, min 80px (with safe-area)
**Content**: Scrollable, padding for nav

### Container
```tsx
<div class="container">
  <!-- Max width 1200px, centered -->
</div>
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0-640px
- **Tablet**: 641px-1024px
- **Desktop**: 1025px+

### Utilities
- `.hidden-mobile` - Hide on mobile
- `.hidden-desktop` - Hide on desktop
- `.grid-2` - 2-column on desktop, 1-column on mobile
- `.grid-3` - 3-column on desktop, 1-column on mobile

---

## ♿ Accessibility

### Keyboard Navigation
- All interactive elements are focusable
- Focus rings are visible (teal outline)
- Tab order follows DOM order

### Semantic HTML
- Use `<button>` for actions
- Use `<a>` for navigation
- Use `<label>` with `<input>`
- Use `role` attributes where needed

### Color Contrast
- Text: Minimum 4.5:1 (WCAG AA)
- UI Components: Minimum 3:1

### Touch Targets
- Minimum 44px × 44px on mobile
- Proper spacing between interactive elements

---

## 🚀 Implementation Guide

### Installing in a Component

```tsx
import '@/index.css';

export function MyComponent() {
  return (
    <div class="card">
      <h2 class="text-lg font-bold mb-md">Title</h2>
      <p class="text-secondary mb-lg">Description</p>
      <button class="btn btn-primary">Action</button>
    </div>
  );
}
```

### Using CSS Variables

```css
.my-custom-component {
  background: var(--bg-white);
  color: var(--text-primary);
  padding: var(--s-6);
  border-radius: var(--r-xl);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}
```

### Creating Custom Components

```tsx
// Badge variant
<span class="badge" style={{ background: '#E0F2FE', color: '#0284C7' }}>
  Custom
</span>

// Button variant
<button class="btn" style={{ background: '#14B8A6' }}>
  Custom
</button>
```

---

## 📊 Dark Mode (Future)

CSS variables support dark mode via `:root[data-theme="dark"]`

```css
:root[data-theme="dark"] {
  --bg-page: #0F172A;
  --bg-white: #1E293B;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  /* ... */
}
```

---

## 🎨 Design Tools

### Figma
- Components library mirrors React components
- Color styles match CSS variables
- Text styles match type scale

### Browser DevTools
- Inspect elements to see CSS variables
- Check animations in Performance tab
- Validate contrast with DevTools

---

## 📝 Best Practices

### Do's ✅
- Use semantic HTML elements
- Follow the spacing scale
- Use utility classes for consistency
- Test on real devices
- Validate keyboard navigation

### Don'ts ❌
- Don't override colors with inline styles
- Don't use magic numbers
- Don't skip alt text or labels
- Don't rely on color alone
- Don't disable focus outlines

---

## 🐛 Troubleshooting

### Colors Not Applying
- Check that `index.css` is imported
- Verify CSS variable names (use Chrome DevTools)
- Clear browser cache

### Animations Not Smooth
- Check browser GPU acceleration
- Reduce animation complexity
- Test on lower-end devices

### Mobile Buttons Too Small
- Ensure minimum 44px height
- Add appropriate padding
- Test with thumb accessibility

---

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Inter Font**: https://fonts.google.com/specimen/Inter
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Design System Reference**: See tourist-safety-app

---

## 📋 Changelog

### v1.0 (Initial Release)
- Complete color palette
- Typography system
- Component library
- Spacing and animation scales
- Mobile-first responsive design
- Dashboard and field app layouts