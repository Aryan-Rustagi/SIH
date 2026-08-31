# Component Usage Guide

## Quick Start

All new UI components are located in `src/components/ui/`. Import them as needed:

```tsx
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';
import { Alert } from './components/ui/Alert';
import { Toast } from './components/ui/Toast';
import { Badge } from './components/ui/Badge';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { EmptyState } from './components/ui/EmptyState';
import { Dropdown } from './components/ui/Dropdown';
import { DataTable } from './components/ui/DataTable';
```

## Component Documentation

### Button Component

**Variants**: `primary`, `secondary`, `tertiary`, `danger`, `success`, `outline`, `ghost`
**Sizes**: `sm`, `md`, `lg`, `xl`

```tsx
// Basic button
<Button>Click me</Button>

// With variant and size
<Button variant="danger" size="lg">
  Delete
</Button>

// With icon and loading state
<Button
  variant="primary"
  icon={<SaveIcon />}
  isLoading={isSaving}
  onClick={handleSave}
>
  Save Changes
</Button>

// Full width button
<Button fullWidth variant="success">
  Submit Form
</Button>
```

### Card Component

**Variants**: `default`, `elevated`, `outlined`

```tsx
// Default card
<Card>
  <div className="p-4">Content</div>
</Card>

// Elevated card with interaction
<Card variant="elevated" interactive onClick={handleClick}>
  <div className="p-6">Clickable card</div>
</Card>

// Outlined card
<Card variant="outlined">
  <div className="p-4">Content</div>
</Card>
```

### Input Component

```tsx
// Basic input with label
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
/>

// With icon
<Input
  label="Password"
  type="password"
  icon={<LockIcon />}
  iconPosition="left"
/>

// With error state
<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error={error && 'Username is required'}
  hint="Choose a unique username"
/>
```

### Badge Component

```tsx
// Different variants
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>

// With icon
<Badge variant="info" icon={<InfoIcon />}>
  Information
</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Modal Component

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
  footer={
    <>
      <Button
        variant="tertiary"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>

<Button onClick={() => setIsOpen(true)}>
  Open Modal
</Button>
```

### Alert Component

```tsx
const [showAlert, setShowAlert] = useState(true);

<Alert
  type="success"
  title="Success!"
  description="Your changes have been saved"
  onClose={() => setShowAlert(false)}
  closeable
/>

<Alert
  type="error"
  title="Error"
  description="Something went wrong"
  action={{
    label: 'Retry',
    onClick: handleRetry,
  }}
/>
```

### Toast Component

```tsx
const [showToast, setShowToast] = useState(false);

<Toast
  type="success"
  title="Saved!"
  message="Your changes have been saved successfully"
  onClose={() => setShowToast(false)}
  duration={3000}
/>

<Toast
  type="error"
  title="Error"
  message="Failed to save changes"
  onClose={() => setShowToast(false)}
  action={{
    label: 'Retry',
    onClick: handleRetry,
  }}
/>
```

### Dropdown Component

```tsx
const [selectedAction, setSelectedAction] = useState<string | null>(null);

<Dropdown
  trigger={
    <Button variant="secondary">
      Actions <ChevronDown size={16} />
    </Button>
  }
  items={[
    { label: 'Edit', value: 'edit', icon: <EditIcon /> },
    { label: 'Delete', value: 'delete', dangerous: true, icon: <TrashIcon /> },
  ]}
  onSelect={setSelectedAction}
  align="right"
/>
```

### LoadingSpinner Component

```tsx
// Basic spinner
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading..." size="md" />

// Full screen spinner
<LoadingSpinner
  text="Processing..."
  size="lg"
  fullScreen
/>
```

### EmptyState Component

```tsx
<EmptyState
  icon={<BoxIcon size={48} />}
  title="No items found"
  description="Get started by creating your first item"
  action={{
    label: 'Create Item',
    onClick: handleCreate,
  }}
/>
```

### PageHeader Component

```tsx
<PageHeader
  title="Dashboard"
  subtitle="Overview"
  description="Get a quick overview of your system status"
  icon={<LayoutDashboardIcon />}
  backButton
  action={
    <Button variant="primary">
      <PlusIcon size={18} />
      New Item
    </Button>
  }
/>
```

### DataTable Component

```tsx
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => <Badge variant={value === 'active' ? 'success' : 'warning'}>{value}</Badge>
  },
  { key: 'email', label: 'Email' },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <Button size="sm" variant="tertiary">
        Edit
      </Button>
    ),
  },
];

<DataTable
  columns={columns}
  data={data}
  onRowClick={(row) => console.log(row)}
  hoverable
  striped
/>
```

## Design Patterns

### Form Validation

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setEmail(value);
  
  if (!value.includes('@')) {
    setEmailError('Please enter a valid email');
  } else {
    setEmailError('');
  }
};

<Input
  label="Email"
  value={email}
  onChange={handleEmailChange}
  error={emailError}
  type="email"
/>
```

### Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await api.post('/submit', data);
    setShowToast({ type: 'success', title: 'Success!' });
  } catch (error) {
    setShowToast({ type: 'error', title: 'Error' });
  } finally {
    setIsLoading(false);
  }
};

<Button
  onClick={handleSubmit}
  isLoading={isLoading}
  variant="primary"
>
  Submit
</Button>
```

### Conditional Rendering

```tsx
{data.length === 0 ? (
  <EmptyState
    icon={<BoxIcon />}
    title="No data"
    action={{ label: 'Create', onClick: handleCreate }}
  />
) : (
  <DataTable columns={columns} data={data} />
)}
```

## Accessibility Features

All components include:
- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states
- Color contrast compliance (WCAG AA)
- Screen reader friendly

## Best Practices

1. **Always provide labels for inputs**
   ```tsx
   <Input label="Name" /> // Good
   <Input placeholder="Name" /> // Avoid
   ```

2. **Use semantic button variants**
   ```tsx
   <Button variant="danger">Delete</Button> // Good
   <Button>Delete</Button> // Less clear
   ```

3. **Provide feedback for user actions**
   ```tsx
   // Show loading state during async operations
   <Button isLoading={isLoading}>Save</Button>
   
   // Show toast on completion
   <Toast type="success" title="Saved!" />
   ```

4. **Use consistent spacing**
   ```tsx
   <div className="space-y-4">
     <Card>Item 1</Card>
     <Card>Item 2</Card>
     <Card>Item 3</Card>
   </div>
   ```

5. **Handle empty states gracefully**
   ```tsx
   {data.length === 0 ? <EmptyState /> : <DataTable />}
   ```

## Migration Guide

If updating from old components:

### Old Button → New Button
```tsx
// Old
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Click
</button>

// New
<Button variant="primary">Click</Button>
```

### Old Card → New Card
```tsx
// Old
<div className="bg-white border border-gray-200 rounded-xl shadow-sm">
  Content
</div>

// New
<Card>Content</Card>
```

## Customization

While the component library provides sensible defaults, you can customize components with props and className:

```tsx
<Card className="shadow-lg">
  <CustomContent />
</Card>

<Button
  className="text-lg"
  variant="primary"
  size="lg"
>
  Custom Button
</Button>
```

## Support

For questions or issues with components, refer to the DESIGN_SYSTEM.md file or create an issue in the repository.
