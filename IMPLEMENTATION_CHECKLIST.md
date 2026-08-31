# SIH UI/UX Implementation Checklist

This checklist helps developers implement the design system consistently across all components.

## ✅ Setup

- [ ] Import `index.css` in main entry point
- [ ] Ensure `tailwind.config.ts` includes all color definitions
- [ ] Test that CSS variables are loaded (open DevTools, check `:root`)
- [ ] Verify fonts are loading (Inter + JetBrains Mono)

---

## 🎨 Color Implementation

### Use CSS Variables
- [ ] Never hardcode colors (use `var(--teal-500)` instead of `#14B8A6`)
- [ ] Check colors in DevTools: right-click → Inspect → check computed styles
- [ ] Update tokens only in `index.css` `:root` section

### Color Checklist per Component
- [ ] **Buttons**: Primary bg, hover state, disabled opacity
- [ ] **Links**: Teal color, no underline except hover
- [ ] **Alerts**: Matching semantic color (success/error/warning)
- [ ] **Badges**: Correct variant class applied
- [ ] **Cards**: White bg, navy border, proper shadow

---

## 🔘 Button Component

### Desktop Buttons
- [ ] Minimum 44px height (including padding)
- [ ] Proper padding: 0.625rem vertical, 1.25rem horizontal
- [ ] Rounded corners: `var(--r-lg)`
- [ ] Smooth transitions: all 0.15s
- [ ] Clear hover state
- [ ] Disabled state: opacity 50%

### Mobile Buttons
- [ ] Touch target: 44px × 44px minimum
- [ ] Adequate spacing between buttons
- [ ] `.btn-block` for full-width forms
- [ ] FAB: `.fab` class, 56px diameter

### Variants Applied
- [ ] `.btn-primary` - Teal bg
- [ ] `.btn-secondary` - Light bg, navy text
- [ ] `.btn-danger` - Red bg
- [ ] `.btn-ghost` - Transparent
- [ ] `.btn-sm` / `.btn-lg` - Size variants

---

## 📝 Form Implementation

### Input Fields
- [ ] Min height 44px
- [ ] 1.5px borders, proper focus ring
- [ ] Focus: Teal border + shadow
- [ ] Placeholder: Muted color
- [ ] Full width by default
- [ ] Proper spacing between fields (gap-4)

### Textarea
- [ ] Min height 100px
- [ ] Vertical resize allowed
- [ ] Same border/focus as inputs
- [ ] Proper padding

### Labels
- [ ] Positioned above inputs
- [ ] Font-weight: 600
- [ ] Color: text-secondary
- [ ] Font-size: 0.75rem

### Validation States
- [ ] Error: Red border + message
- [ ] Success: Teal checkmark
- [ ] Warning: Amber border
- [ ] Disabled: Opacity 50%

---

## 🏷️ Typography

### Heading Hierarchy
- [ ] `<h1>`: font-size 2.75rem, font-weight 800
- [ ] `<h2>`: font-size 1.875rem, font-weight 700
- [ ] `<h3>`: font-size 1.125rem, font-weight 700
- [ ] Use semantic tags (not `<div class="h1">`)

### Text Sizes
- [ ] `.text-xs`: 0.75rem (captions, labels)
- [ ] `.text-sm`: 0.875rem (secondary text)
- [ ] `.text-base`: 1rem (default body)
- [ ] `.text-lg`: 1.125rem (emphasis)

### Text Colors
- [ ] `.text-primary`: For all body text
- [ ] `.text-secondary`: For supplementary info
- [ ] `.text-muted`: For disabled/hints
- [ ] Sufficient contrast ratio (4.5:1)

### Font Weights
- [ ] 400 (normal): Body text
- [ ] 600 (semibold): Labels, buttons
- [ ] 700 (bold): Headings
- [ ] 800-900: Hero titles only

---

## 🎴 Card Component

### Structure
- [ ] White background
- [ ] 1px navy border
- [ ] Rounded corners: `var(--r-xl)`
- [ ] Padding: `var(--s-6)` (24px)
- [ ] Shadow: `var(--shadow-sm)`

### Variants
- [ ] `.card`: Default styling
- [ ] `.card-interactive`: Hover effects, cursor pointer
- [ ] `.card-glow`: Teal border + glow effect

### Hover States
- [ ] Border color changes to `--border-strong`
- [ ] Shadow increases to `var(--shadow-md)`
- [ ] Subtle `translateY(-1px)` transform
- [ ] Smooth transition: 0.15s

### Mobile Cards
- [ ] Stacked layout on mobile
- [ ] Full width with proper margins
- [ ] `.card-interactive` shows tap feedback

---

## ⚠️ Alert Component

### All Alert Types
- [ ] `.alert-success`: Emerald background
- [ ] `.alert-error`: Red background
- [ ] `.alert-warning`: Amber background
- [ ] `.alert-info`: Sky background

### Structure
- [ ] Icon/emoji at start
- [ ] Proper padding: `var(--s-3)` top/bottom
- [ ] Border matches background color
- [ ] Clear, readable text
- [ ] Close button (if dismissible)

### Content
- [ ] Concise message (1-2 sentences)
- [ ] Action-oriented copy
- [ ] Icon clearly indicates status

---

## 📐 Spacing & Layout

### Grid System
- [ ] `.grid-2`: 2-column on desktop, 1 on mobile
- [ ] `.grid-3`: 3-column on desktop, responsive
- [ ] `.grid-4`: 4-column on desktop, responsive
- [ ] Gap: 16px (`gap-4`) between items

### Flex Utilities
- [ ] `.flex items-center`: Vertical center
- [ ] `.flex justify-between`: Space between
- [ ] `.flex-col gap-4`: Column layout with gap

### Margin & Padding
- [ ] Use scale: `.mt-md`, `.mb-lg`, etc.
- [ ] Never use magic numbers
- [ ] Consistent spacing between sections
- [ ] `.pb-bottom-nav`: Add padding for fixed nav

### Container
- [ ] Max width: 1200px
- [ ] Horizontal padding: `var(--s-6)` (24px)
- [ ] Responsive on all screen sizes

---

## 📱 Responsive Design

### Mobile (< 640px)
- [ ] Single column layout
- [ ] Full-width cards
- [ ] `.btn-block` for CTAs
- [ ] `.fab` for primary action
- [ ] Bottom nav for main navigation
- [ ] Comfortable touch targets (44px+)

### Tablet (641px - 1024px)
- [ ] `.grid-2` / `.grid-3` appropriate
- [ ] Sidebar optional
- [ ] Touch-friendly still

### Desktop (> 1024px)
- [ ] Multi-column layouts
- [ ] Sidebar navigation
- [ ] Hover effects enabled
- [ ] Comfortable mouse usage

### Utility Classes
- [ ] `.hidden-mobile`: Hide on phones
- [ ] `.hidden-desktop`: Hide on desktop
- [ ] Use within media query blocks

---

## ♿ Accessibility Checklist

### HTML Semantics
- [ ] Use `<button>` for actions (not `<div>`)
- [ ] Use `<a>` for navigation (not `<button>`)
- [ ] Use `<label>` for form inputs
- [ ] Use proper heading hierarchy
- [ ] Use `<nav>`, `<main>`, `<footer>`

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Tab order logical (left to right, top to bottom)
- [ ] Focus visible: Teal ring/outline
- [ ] No keyboard traps

### Screen Readers
- [ ] Alt text for all images
- [ ] ARIA labels for icon buttons
- [ ] Descriptive link text (not "click here")
- [ ] Form labels properly associated

### Color & Contrast
- [ ] Text contrast: 4.5:1 minimum
- [ ] UI contrast: 3:1 minimum
- [ ] Don't rely on color alone (use icons/text)
- [ ] Test with accessibility checker

### Mobile Accessibility
- [ ] Touch targets: 44px × 44px
- [ ] Proper spacing between buttons
- [ ] Readable text (16px+ on mobile)
- [ ] No hover-only content

---

## 🎬 Animation Implementation

### Usage
- [ ] `animation: fadeIn 0.5s ease-out`
- [ ] `animation: slideUp 0.4s cubic-bezier(...)`
- [ ] Only for meaningful interactions
- [ ] Respect `prefers-reduced-motion`

### Performance
- [ ] Use `transform` and `opacity` (GPU accelerated)
- [ ] Avoid animating `layout` properties
- [ ] Test on low-end devices
- [ ] Disable on slow networks if needed

### Accessibility
- [ ] `@media (prefers-reduced-motion: reduce)` - Disable
- [ ] Animations don't convey critical info
- [ ] Keep animations short (< 1s)

---

## 📊 Component Testing

For each component, test:

- [ ] Visual design matches Figma
- [ ] Responsive behavior (mobile, tablet, desktop)
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Color contrast passes WCAG AA
- [ ] Animations smooth and performant
- [ ] Touch targets adequate (mobile)
- [ ] No horizontal scrolling (mobile)
- [ ] Forms are usable
- [ ] Links are understandable

---

## 🔄 Component Patterns

### Loading States
```tsx
<button class="btn btn-primary" disabled>Loading...</button>
```
- [ ] Spinner or text indicator
- [ ] Button disabled during load
- [ ] Clear completion state

### Error States
```tsx
<div class="alert alert-error">Error message</div>
```
- [ ] Clear error description
- [ ] Action to resolve (retry, help)
- [ ] Related field highlighted

### Success States
```tsx
<div class="alert alert-success">✓ Saved!</div>
```
- [ ] Confirmation message
- [ ] Auto-dismiss after 3-5s
- [ ] Visual confirmation (checkmark, glow)

### Empty States
```tsx
<div class="text-center mt-12">
  <p class="text-muted">No items found</p>
</div>
```
- [ ] Helpful message
- [ ] Action to create/add items
- [ ] Illustration (optional)

---

## 🚀 Performance Optimization

- [ ] Minimize CSS (production build)
- [ ] Load fonts from Google Fonts CDN
- [ ] Use CSS variables (smaller than inline styles)
- [ ] Lazy load heavy components
- [ ] Optimize images (webp, responsive sizes)
- [ ] No layout shifts (set fixed button heights)
- [ ] Smooth 60fps animations
- [ ] Test with Lighthouse

---

## 📋 Pre-Deployment Checklist

- [ ] All colors use CSS variables
- [ ] All spacing uses scale classes
- [ ] Buttons have proper sizes (44px+)
- [ ] Forms are keyboard accessible
- [ ] Alerts are clear and actionable
- [ ] Responsive design works on all sizes
- [ ] Accessibility: Color contrast ✓
- [ ] Accessibility: Keyboard navigation ✓
- [ ] No console errors/warnings
- [ ] Performance: LCP < 2.5s, FID < 100ms
- [ ] All links have proper href
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Touch targets adequate
- [ ] Animations smooth
- [ ] Designs match approved mockups

---

## 📚 Documentation Links

- **Full Design System**: `UPDATED_DESIGN_SYSTEM.md`
- **Quick Reference**: `UI_UX_QUICK_REFERENCE.md`
- **Tourist Safety App**: Reference implementation
- **Tailwind Docs**: https://tailwindcss.com/docs
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## 🆘 Common Issues & Solutions

### Issue: Colors not applying
**Solution**: Check CSS import, clear cache, verify variable names

### Issue: Buttons too small on mobile
**Solution**: Ensure min-height 44px, add padding, use `.btn-lg`

### Issue: Text not readable
**Solution**: Increase font size, check contrast ratio, use proper color

### Issue: Layout shifts on load
**Solution**: Set fixed button heights, preload fonts, define image dimensions

### Issue: Animations janky
**Solution**: Use transform/opacity only, reduce complexity, test on low-end devices

### Issue: Keyboard navigation not working
**Solution**: Use semantic HTML, check tab order, ensure focus visible