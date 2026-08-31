# Quick Component Reference

## 🚀 Most Commonly Used Components

### 1. Button
```tsx
import { Button } from './components/Button';

// Primary action
<Button>Save</Button>

// Destructive action
<Button variant="danger">Delete</Button>

// With icon
<Button icon={<SaveIcon />}>Save</Button>

// Loading state
<Button isLoading={isSaving}>Saving...</Button>
```

### 2. Card
```tsx
import { Card } from './components/Card';

// Basic card
<Card>
  <div className="p-6">Content</div>
</Card>

// Interactive card
<Card interactive onClick={handleClick}>
  Clickable Card
</Card>
```

### 3. Input
```tsx
import { Input } from './components/ui/Input';

// Basic input with label
<Input label="Email" type="email" />

// With validation error
<Input 
  label="Username"
  error={error}
  hint="3-20 characters"
/>
```

### 4. Badge
```tsx
import { Badge } from './components/ui/Badge';

// Status badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>

// With icon
<Badge variant="info" icon={<InfoIcon />}>
  New
</Badge>
```

### 5. Alert
```tsx
import { Alert } from './components/ui/Alert';

// Success alert
<Alert
  type="success"
  title="Saved successfully"
  description="Your changes have been saved"
  onClose={() => setShowAlert(false)}
/>
```

### 6. Modal
```tsx
import { Modal } from './components/ui/Modal';

// Confirmation modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="tertiary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  Are you sure?
</Modal>
```

### 7. LoadingSpinner
```tsx
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Inline spinner
<LoadingSpinner size="md" text="Loading..." />

// Full-screen spinner
<LoadingSpinner size="lg" text="Processing..." fullScreen />
```

### 8. EmptyState
```tsx
import { EmptyState } from './components/ui/EmptyState';

// When no data exists
{data.length === 0 && (
  <EmptyState
    icon={<BoxIcon size={48} />}
    title="No items found"
    action={{
      label: 'Create Item',
      onClick: handleCreate,
    }}
  />
)}
```

### 9. Toast Notifications
```tsx
import { Toast } from './components/ui/Toast';

// Success toast
const [showToast, setShowToast] = useState(false);

<Toast
  type="success"
  title="Success!"
  message="Operation completed"
  onClose={() => setShowToast(false)}
/>
```

### 10. DataTable
```tsx
import { DataTable } from './components/ui/DataTable';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <Badge variant={value}>{value}</Badge>,
  },
];

<DataTable columns={columns} data={items} />
```

## 🎨 Common Patterns

### Form with Validation
```tsx
const [formData, setFormData] = useState({ email: '', password: '' });
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.email) newErrors.email = 'Email is required';
  if (!formData.password) newErrors.password = 'Password is required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  
  try {
    await api.post('/login', formData);
    // Show success toast
  } catch (error) {
    setErrors({ submit: error.message });
  }
};

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <Input
      label="Email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      error={errors.email}
    />
    <Input
      label="Password"
      type="password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      error={errors.password}
    />
    <Button type="submit" fullWidth>
      Sign In
    </Button>
  </form>
);
```

### Data Loading with States
```tsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/items');
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  loadData();
}, []);

if (loading) return <LoadingSpinner fullScreen />;
if (error) return <Alert type="error" title="Error" description={error} />;
if (data.length === 0) return <EmptyState />;

return <DataTable columns={columns} data={data} />;
```

### Modal with Form
```tsx
const [isOpen, setIsOpen] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (formData) => {
  setIsSubmitting(true);
  try {
    await api.post('/items', formData);
    setIsOpen(false);
    // Refresh data
  } catch (error) {
    // Show error
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <>
    <Button onClick={() => setIsOpen(true)}>New Item</Button>
    
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Create Item"
      footer={
        <>
          <Button
            variant="tertiary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            onClick={() => handleSubmit(formData)}
          >
            Create
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        {/* Form fields */}
      </form>
    </Modal>
  </>
);
```

## 🎯 Color Usage Examples

```tsx
// Success/Positive
<Badge variant="success">Active</Badge>
<Button variant="success">Approve</Button>

// Danger/Destructive
<Badge variant="danger">Inactive</Badge>
<Button variant="danger">Delete</Button>

// Warning/Caution
<Badge variant="warning">Pending</Badge>
<Alert type="warning" title="Warning" />

// Info
<Badge variant="info">New</Badge>
<Alert type="info" title="Information" />
```

## 📱 Responsive Classes

```tsx
// Text size
<h1 className="text-2xl sm:text-3xl md:text-4xl">Responsive Title</h1>

// Layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>

// Visibility
<div className="hidden md:block">
  Desktop only content
</div>
```

## 🔑 Key Props Reference

### Button
- `variant`: primary, secondary, tertiary, danger, success, outline, ghost
- `size`: sm, md, lg, xl
- `isLoading`: boolean
- `fullWidth`: boolean
- `icon`: React.ReactNode

### Input
- `label`: string
- `error`: string
- `hint`: string
- `icon`: React.ReactNode
- `iconPosition`: left, right

### Card
- `variant`: default, elevated, outlined
- `interactive`: boolean

### Badge
- `variant`: safe, caution, danger, info, success, warning, neutral
- `size`: sm, md, lg
- `icon`: React.ReactNode

### Modal
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `size`: sm, md, lg, xl
- `footer`: React.ReactNode

### Alert/Toast
- `type`: success, error, info, warning
- `title`: string
- `description`: string
- `onClose`: () => void
- `action`: { label, onClick }

## 🚀 Pro Tips

1. **Always wrap form fields in a container with space-y gap**
   ```tsx
   <form className="space-y-4">
     <Input label="Name" />
     <Input label="Email" />
     <Button>Submit</Button>
   </form>
   ```

2. **Use conditional rendering for empty states**
   ```tsx
   {items.length === 0 ? <EmptyState /> : <DataTable />}
   ```

3. **Combine loading and error states**
   ```tsx
   if (loading) return <LoadingSpinner />;
   if (error) return <Alert type="error" title={error} />;
   return <Content />;
   ```

4. **Use variants consistently**
   ```tsx
   // Destructive action
   <Button variant="danger">Delete</Button>
   
   // Not
   <Button>Delete</Button>
   ```

5. **Always provide alt text and labels**
   ```tsx
   <Input label="Email" placeholder="Enter email" />
   // Not
   <input placeholder="Email" />
   ```

## 📚 Further Learning

- See `DESIGN_SYSTEM.md` for design principles
- See `COMPONENT_USAGE.md` for detailed examples
- Check individual component files for TypeScript interfaces
