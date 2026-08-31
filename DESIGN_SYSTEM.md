# Tourist Safety App - Modern UI/UX Design System

## 🎨 Design Philosophy

This design system provides a modern, accessible, and consistent UI/UX across the entire tourist safety application. It follows contemporary design trends while maintaining clarity and usability.

## 📐 Color Palette

### Primary Colors
- **Teal**: #14b8a6 (Primary actions, highlights)
- **Navy**: #0d1526 (Dark backgrounds, text)
- **Slate**: #0f172a (Secondary text, borders)

### Semantic Colors
- **Success**: #10b981 (Emerald)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)
- **Info**: #3b82f6 (Blue)

## 🔤 Typography

- **Font Family**: Inter (sans-serif)
- **Mono**: JetBrains Mono
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 900 (black)

### Text Hierarchy
- **Display**: 4xl (48px) - Bold headlines
- **Large**: 2xl (24px) - Section titles
- **Medium**: lg (18px) - Subsection titles
- **Base**: base (16px) - Body text
- **Small**: sm (14px) - Secondary text
- **Extra Small**: xs (12px) - Captions, labels

## 🎯 Component Library

### Buttons
**Variants**: primary, secondary, tertiary, danger, success, outline, ghost
**Sizes**: sm, md, lg, xl
**Features**: Loading state, icon support, full-width option

```tsx
<Button variant="primary" size="md" icon={<CheckIcon />}>
  Action
</Button>
```

### Cards
**Variants**: default, elevated, outlined
**Features**: Interactive mode with hover scale

```tsx
<Card variant="elevated" interactive>
  Content
</Card>
```

### Badges
**Variants**: safe, caution, danger, info, success, warning, neutral
**Sizes**: sm, md, lg

```tsx
<Badge variant="success" size="md" icon={<CheckIcon />}>
  Status
</Badge>
```

### Inputs
**Features**: 
- Label and hint text
- Icon support (left/right)
- Error state with message
- Accessible focus states

```tsx
<Input
  label="Email"
  type="email"
  icon={<MailIcon />}
  error={error}
  hint="Your email address"
/>
```

### Modals
**Features**:
- Customizable sizes (sm, md, lg, xl)
- Backdrop blur
- Close button
- Footer actions

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm Action"
  footer={<Button onClick={onConfirm}>Confirm</Button>}
>
  Content
</Modal>
```

### Alerts
**Types**: success, error, info, warning
**Features**: Closeable, actionable, descriptions

```tsx
<Alert
  type="success"
  title="Success"
  description="Action completed"
  onClose={onClose}
/>
```

### Toasts
**Usage**: Temporary notifications in corner
**Types**: success, error, info, warning

### Loading Spinner
**Sizes**: sm, md, lg
**Features**: Full-screen mode, custom text

### Empty State
**Features**: Icon, title, description, action button

## 🎨 Spacing & Layout

- **Padding**: 4px, 6px, 8px, 12px, 16px, 24px, 32px, 48px
- **Gap**: 4px, 8px, 12px, 16px, 24px
- **Border Radius**: 6px (xs), 8px (sm), 12px (md), 16px (lg), 24px (2xl)

## ✨ Animations

- **Fade In**: 0.5s ease-out
- **Fade In Up**: 0.6s ease-out
- **Slide Up**: 0.4s cubic-bezier
- **Scale In**: 0.3s cubic-bezier
- **Pulse Glow**: 2s infinite
- **Bounce Slow**: 3s infinite

## 🌓 Dark Mode Support

Dark mode styles use navy-950 to navy-900 backgrounds with appropriate contrast ratios.

## ♿ Accessibility Features

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (WCAG AA minimum)
- Focus states on interactive elements
- Loading states for async operations

## 📱 Responsive Design

- **Mobile First**: Base styles for small screens
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🚀 Best Practices

1. **Consistency**: Use component library for all UI elements
2. **Clarity**: Maintain clear visual hierarchy
3. **Feedback**: Provide user feedback for all interactions
4. **Performance**: Optimize animations for smooth UX
5. **Accessibility**: Always consider accessibility
6. **Mobile**: Test on mobile devices
7. **Testing**: Test with different browsers and screen sizes

## 📝 Usage Guidelines

### Color Usage
- Use teal for primary actions
- Use red for destructive actions
- Use green for positive actions
- Use amber for warnings
- Use blue for information

### Button Guidelines
- Primary: Main actions
- Secondary: Alternative actions
- Tertiary: Less important actions
- Danger: Destructive actions
- Ghost: Subtle actions

### Spacing
- Use consistent spacing between elements
- Larger spacing for section separation
- Smaller spacing for related content

### Typography
- Use black (900) for primary headings
- Use semibold (600) for secondary headings
- Use medium (500) for labels
- Use normal (400) for body text
- Use 14px for secondary text, 12px for captions
