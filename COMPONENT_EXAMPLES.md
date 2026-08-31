# SIH Component Examples & Usage Guide

Complete examples of how to use each component with proper styling and accessibility.

---

## 📘 Buttons

### Primary Button
```tsx
<button class="btn btn-primary">Save Changes</button>

// Large variant
<button class="btn btn-primary btn-lg">Large Action</button>

// Small variant
<button class="btn btn-primary btn-sm">Small</button>

// Full width (mobile forms)
<button class="btn btn-primary btn-block">Full Width Button</button>

// With icon
<button class="btn btn-primary">
  <span>🔒</span> Secure Login
</button>

// Loading state
<button class="btn btn-primary" disabled>Loading...</button>
```

### Secondary Button
```tsx
<button class="btn btn-secondary">Cancel</button>
<button class="btn btn-secondary btn-lg">Large Secondary</button>
```

### Danger Button
```tsx
<button class="btn btn-danger">Delete Account</button>
<button class="btn btn-danger btn-block">Remove Selected</button>
```

### Ghost Button
```tsx
<button class="btn btn-ghost">Learn More</button>
```

---

## 📝 Forms

### Basic Form Structure
```tsx
<form class="flex flex-col gap-4">
  <!-- Email Field -->
  <div>
    <label class="label">Email Address</label>
    <input 
      type="email" 
      class="input" 
      placeholder="Enter your email"
      required 
    />
  </div>

  <!-- Password Field -->
  <div>
    <label class="label">Password</label>
    <input 
      type="password" 
      class="input" 
      placeholder="••••••••"
      required 
    />
  </div>

  <!-- Textarea -->
  <div>
    <label class="label">Message</label>
    <textarea 
      class="input" 
      placeholder="Type your message..."
      rows="4"
    ></textarea>
  </div>

  <!-- Submit Button -->
  <button type="submit" class="btn btn-primary btn-block btn-lg">
    Sign Up
  </button>
</form>
```

### Form with Icon Input
```tsx
<div>
  <label class="label">Search</label>
  <div class="input-group">
    <input 
      type="text" 
      class="input input-with-icon" 
      placeholder="Search..."
    />
    <span class="input-icon">🔍</span>
  </div>
</div>
```

### Form with Validation
```tsx
<div>
  <label class="label">Username</label>
  <input 
    type="text" 
    class="input" 
    placeholder="Choose a username"
  />
  <p class="text-xs text-muted mt-1">
    3-20 characters, letters and numbers only
  </p>
</div>

<!-- Error state -->
<div>
  <label class="label">Email</label>
  <input 
    type="email" 
    class="input border-red-500" 
    value="invalid-email"
  />
  <p class="text-xs text-red-600 mt-1">
    Please enter a valid email address
  </p>
</div>
```

---

## 🎴 Cards

### Basic Card
```tsx
<div class="card">
  <h3 class="text-lg font-bold mb-md">Card Title</h3>
  <p class="text-secondary mb-md">This is the card content.</p>
  <button class="btn btn-secondary">Learn More</button>
</div>
```

### Interactive Card (Clickable)
```tsx
<div class="card card-interactive" onclick="navigateTo('/page')">
  <div class="flex items-center gap-4">
    <div class="icon-box icon-box-lg icon-box-teal">
      🏠
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-bold">Dashboard</h3>
      <p class="text-sm text-secondary">Go to your dashboard</p>
    </div>
  </div>
</div>
```

### Card with Highlighted State
```tsx
<div class="card card-glow">
  <div class="flex items-start justify-between">
    <div>
      <h3 class="text-lg font-bold mb-2">Important Notice</h3>
      <p class="text-secondary">System maintenance scheduled</p>
    </div>
    <button class="icon-btn">✕</button>
  </div>
</div>
```

### Card Grid Layout
```tsx
<div class="grid grid-3 gap-4">
  <div class="card">
    <h3 class="text-lg font-bold mb-4">Users</h3>
    <p class="text-3xl font-bold text-teal">1,234</p>
    <p class="text-sm text-secondary">+12% this month</p>
  </div>
  
  <div class="card">
    <h3 class="text-lg font-bold mb-4">Revenue</h3>
    <p class="text-3xl font-bold text-emerald">$12,456</p>
    <p class="text-sm text-secondary">+8% this month</p>
  </div>

  <div class="card">
    <h3 class="text-lg font-bold mb-4">Incidents</h3>
    <p class="text-3xl font-bold text-amber">24</p>
    <p class="text-sm text-secondary">In progress</p>
  </div>
</div>
```

---

## 🏷️ Badges & Status

### Status Badges
```tsx
<!-- Safe status -->
<span class="badge badge-safe">✓ Safe Zone</span>

<!-- Caution status -->
<span class="badge badge-caution">⚠ Caution Area</span>

<!-- Danger status -->
<span class="badge badge-danger">✕ Danger Zone</span>

<!-- Info -->
<span class="badge badge-info">ℹ Information</span>
```

### Status Indicators
```tsx
<!-- Active indicator with pulse -->
<div class="flex items-center gap-2">
  <span class="status-dot safe"></span>
  <span class="text-sm font-semibold">Online</span>
</div>

<!-- Caution indicator -->
<div class="flex items-center gap-2">
  <span class="status-dot caution"></span>
  <span class="text-sm font-semibold">In Progress</span>
</div>

<!-- Danger indicator -->
<div class="flex items-center gap-2">
  <span class="status-dot danger"></span>
  <span class="text-sm font-semibold">Critical</span>
</div>
```

---

## ⚠️ Alerts

### Success Alert
```tsx
<div class="alert alert-success">
  <span>✓</span>
  <div>
    <p class="font-semibold">Success!</p>
    <p class="text-sm">Your changes have been saved.</p>
  </div>
</div>
```

### Error Alert
```tsx
<div class="alert alert-error">
  <span>✕</span>
  <div>
    <p class="font-semibold">Error!</p>
    <p class="text-sm">Something went wrong. Please try again.</p>
  </div>
</div>
```

### Warning Alert
```tsx
<div class="alert alert-warning">
  <span>⚠</span>
  <div>
    <p class="font-semibold">Warning</p>
    <p class="text-sm">This action cannot be undone.</p>
  </div>
</div>
```

### Info Alert
```tsx
<div class="alert alert-info">
  <span>ℹ</span>
  <div>
    <p class="font-semibold">Information</p>
    <p class="text-sm">New features are now available.</p>
  </div>
</div>
```

### Dismissible Alert
```tsx
<div class="alert alert-info flex justify-between">
  <div class="flex items-start gap-3">
    <span>ℹ</span>
    <p>You have a new message</p>
  </div>
  <button class="icon-btn">✕</button>
</div>
```

---

## 🎬 Common Patterns

### Loading State
```tsx
<div class="card text-center py-8">
  <div style="animation: spin 1s linear infinite">⚙️</div>
  <p class="text-secondary mt-4">Loading...</p>
</div>
```

### Empty State
```tsx
<div class="text-center py-12">
  <p class="text-4xl mb-4">📭</p>
  <h3 class="text-lg font-bold mb-2">No Results</h3>
  <p class="text-secondary mb-6">Try adjusting your search</p>
  <button class="btn btn-primary">Create New</button>
</div>
```

### Confirmation Dialog
```tsx
<div class="card card-glow max-w-md mx-auto">
  <h3 class="text-lg font-bold mb-4">Delete Item?</h3>
  <p class="text-secondary mb-6">
    This action cannot be undone.
  </p>
  <div class="flex gap-3">
    <button class="btn btn-secondary flex-1">Cancel</button>
    <button class="btn btn-danger flex-1">Delete</button>
  </div>
</div>
```

### Success Confirmation
```tsx
<div class="card card-glow text-center">
  <p class="text-5xl mb-4">✓</p>
  <h3 class="text-lg font-bold mb-2">Success!</h3>
  <p class="text-secondary mb-6">
    Your request has been completed.
  </p>
  <button class="btn btn-primary btn-block">Continue</button>
</div>
```

### Error Message
```tsx
<div class="card border-red-500 bg-red-50">
  <div class="flex gap-3">
    <span class="text-2xl flex-shrink-0">✕</span>
    <div class="flex-1">
      <h3 class="font-bold text-red-700">Error</h3>
      <p class="text-sm text-red-600">
        Failed to save changes. Please check your input.
      </p>
      <button class="btn btn-sm btn-outline mt-3">Retry</button>
    </div>
  </div>
</div>
```

---

## 🏢 Layouts

### Dashboard Layout
```tsx
<div class="dashboard-shell">
  <!-- Sidebar -->
  <aside class="dashboard-sidebar">
    <nav class="flex flex-col gap-2 p-4">
      <a href="#" class="nav-link active">Dashboard</a>
      <a href="#" class="nav-link">Users</a>
      <a href="#" class="nav-link">Settings</a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="dashboard-content">
    <div class="page-header mb-8">
      <h1>Dashboard</h1>
      <p class="text-secondary">Welcome back!</p>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-4 gap-4 mb-8">
      <div class="metric-card">
        <p class="stat-label">Total Users</p>
        <p class="stat-value">1,234</p>
      </div>
      <!-- More cards -->
    </div>
  </main>
</div>
```

### Mobile Layout
```tsx
<div class="app-wrapper">
  <!-- Header -->
  <header class="safe-area-top">
    <h1 class="text-2xl font-bold">App</h1>
  </header>

  <!-- Scrollable Content -->
  <main class="scrollable-content">
    <div class="container-sm">
      <!-- Content here -->
    </div>
  </main>

  <!-- Bottom Navigation -->
  <nav class="mobile-nav safe-area-bottom">
    <a href="#" class="nav-item active">
      <span>🏠</span> Home
    </a>
    <a href="#" class="nav-item">
      <span>🔍</span> Search
    </a>
    <a href="#" class="nav-item">
      <span>👤</span> Profile
    </a>
  </nav>

  <!-- Floating Action Button -->
  <button class="fab">➕</button>
</div>
```

### Hero Section
```tsx
<section class="py-20 text-center">
  <h1 class="text-5xl font-bold mb-6">
    Welcome to SIH
  </h1>
  <p class="text-xl text-secondary mb-8 max-w-2xl mx-auto">
    Smart India Hackathon platform for safety and innovation
  </p>
  <div class="flex gap-4 justify-center">
    <button class="btn btn-primary btn-lg">Get Started</button>
    <button class="btn btn-secondary btn-lg">Learn More</button>
  </div>
</section>
```

---

## 🎨 Color Usage

### Using CSS Variables in Components
```tsx
<!-- Teal accent -->
<div class="border-l-4" style="border-color: var(--teal-500)">
  Content
</div>

<!-- Status color -->
<span style="color: var(--emerald-600)">✓ Verified</span>

<!-- Custom bg -->
<div style="background: var(--navy-50)">
  Subtle background
</div>
```

### Dynamic Color Classes
```tsx
<!-- For status badges -->
<span class="badge" style={{
  background: `${status === 'safe' ? 'var(--emerald-100)' : 'var(--red-100)'}`,
  color: `${status === 'safe' ? 'var(--emerald-600)' : 'var(--red-600)'}`
}}>
  {status.toUpperCase()}
</span>
```

---

## ♿ Accessibility Examples

### Form with Proper Labels
```tsx
<form class="flex flex-col gap-4">
  <div>
    <label htmlFor="email" class="label">Email Address</label>
    <input 
      id="email"
      type="email" 
      class="input" 
      aria-describedby="email-hint"
    />
    <span id="email-hint" class="text-xs text-secondary">
      We'll never share your email
    </span>
  </div>

  <div>
    <label htmlFor="password" class="label">Password</label>
    <input 
      id="password"
      type="password" 
      class="input" 
      aria-describedby="password-hint"
    />
    <span id="password-hint" class="text-xs text-secondary">
      At least 8 characters
    </span>
  </div>

  <button type="submit" class="btn btn-primary">Sign In</button>
</form>
```

### Icon Button with Label
```tsx
<button 
  class="icon-btn" 
  aria-label="Close menu"
  title="Close (Esc)"
>
  ✕
</button>
```

### Status Indicator with Description
```tsx
<div role="status" aria-live="polite">
  <span class="status-dot safe"></span>
  <span class="sr-only">System status: Online</span>
  <span aria-hidden="true">Online</span>
</div>
```

---

## 📱 Responsive Examples

### Responsive Grid
```tsx
<div class="grid grid-4 gap-4">
  <!-- 4 columns on desktop, 2 on tablet, 1 on mobile -->
</div>

<!-- Or -->
<div class="grid grid-3 gap-4 md-grid-2">
  <!-- 3 on desktop, 2 on tablet/mobile -->
</div>
```

### Responsive Text
```tsx
<h1 class="text-2xl md:text-3xl lg:text-5xl">
  Responsive Heading
</h1>
```

### Mobile-Only Navigation
```tsx
<nav class="hidden-desktop mobile-nav">
  <!-- Mobile menu -->
</nav>

<nav class="hidden-mobile">
  <!-- Desktop menu -->
</nav>
```

---

## 🚀 Performance Tips

### Images
```tsx
<img 
  src="image.webp" 
  alt="Description"
  width="400"
  height="300"
  loading="lazy"
/>
```

### Lazy Loading Components
```tsx
{showDetails && (
  <div class="card">
    {/* Only render when needed */}
  </div>
)}
```

### CSS Animation Performance
```tsx
<!-- Use transform and opacity -->
<div style={{
  animation: 'slideUp 0.4s ease-out',
  transform: 'translateY(0)'
}}>
  Content
</div>
```