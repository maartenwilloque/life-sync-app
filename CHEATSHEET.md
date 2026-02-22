# Life Sync - Quick Reference Cheat Sheet

## 🚀 Essential Commands

```bash
# Install & Start
npm install          # First time only
npm run dev          # Start dev server (http://localhost:5174)

# Development
npm run lint         # Check for errors
npm run build        # Create production build
npm run preview      # Preview production build

# Cleanup
rm -r node_modules   # Delete dependencies (if needed)
npm cache clean --force  # Clear npm cache
```

---

## 📁 Quick File Locations

| Need to... | Edit this file |
|-----------|-------------|
| Add a feature | `src/App.tsx` or create in `src/components/` |
| Change colors | `tailwind.config.js` or `src/index.css` |
| Add types | `src/types.ts` |
| Fix state bugs | `src/hooks/useStore.ts` |
| View agenda logic | `src/components/AgendaView.tsx` |
| View shopping logic | `src/components/ShoppingView.tsx` |
| Change navigation | `src/components/Navigation.tsx` |
| Debug styles | `src/App.css` or `src/index.css` |

---

## 💾 LocalStorage Access

### In Browser Console (F12)
```javascript
// View all stored data
JSON.parse(localStorage.getItem('agenda'))
JSON.parse(localStorage.getItem('shopping'))

// Clear all data
localStorage.clear()

// Clear specific item
localStorage.removeItem('agenda')
```

---

## 🎨 Common Tailwind Classes

```css
/* Colors */
.bg-indigo-600      /* Primary blue */
.bg-blue-50         /* Work section */
.bg-pink-50         /* Private section */
.text-green-500     /* Success/complete */

/* Sizing */
.w-6 h-6            /* Icon size */
.p-4                /* Padding */
.gap-3              /* Space between items */

/* Layout */
.flex                /* Flexbox */
.flex-1              /* Take remaining space */
.fixed bottom-0      /* Sticky to bottom */
.sticky top-0        /* Sticky to top */
.md:hidden           /* Hide on mobile */
.md:block            /* Show on desktop */

/* Effects */
.shadow-md           /* Drop shadow */
.rounded-lg          /* Rounded corners */
.transition-colors   /* Smooth color change */
.hover:bg-indigo-700 /* Hover effect */
```

---

## 🔄 Common Actions in Code

### Add new type
```typescript
// In src/types.ts
export interface MyItem {
  id: string;
  name: string;
  created: Date;
}
```

### Create new hook
```typescript
// In src/hooks/useMyHook.ts
import { useState } from 'react';

export const useMyHook = () => {
  const [state, setState] = useState(null);
  return { state, setState };
};
```

### Create new component
```typescript
// In src/components/MyComponent.tsx
import React from 'react';

export const MyComponent: React.FC = () => {
  return <div>My Component</div>;
};
```

### Add state in hook
```typescript
// In src/hooks/useStore.ts
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('myData');
  return saved ? JSON.parse(saved) : [];
});
```

---

## 🧩 Component Props Pattern

```typescript
interface ComponentProps {
  title: string;
  onClick: () => void;
  items?: string[];
}

export const MyComponent: React.FC<ComponentProps> = ({ title, onClick, items }) => {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {items?.map(item => <p key={item}>{item}</p>)}
    </div>
  );
};
```

---

## 🎯 Common Patterns

### Render list
```tsx
{items.map(item => (
  <div key={item.id} className="flex items-center gap-3">
    <span>{item.name}</span>
    <button onClick={() => delete(item.id)}>Delete</button>
  </div>
))}
```

### Conditional render
```tsx
{isLoading ? <Spinner /> : <Content />}
{items.length === 0 ? <EmptyState /> : <List />}
```

### Form handling
```tsx
const [input, setInput] = useState('');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  addItem(input);
  setInput('');
};

return (
  <form onSubmit={handleSubmit}>
    <input value={input} onChange={e => setInput(e.target.value)} />
    <button type="submit">Add</button>
  </form>
);
```

### Toggle state
```tsx
const [completed, setCompleted] = useState(false);

// Simple toggle
setCompleted(!completed);

// In map
items.map(item => 
  item.id === targetId 
    ? { ...item, completed: !item.completed }
    : item
)
```

---

## 🐛 Debug Tricks

### Log everything
```typescript
console.log('State:', state);
console.table(items);  // Better for arrays
console.error('Error:', error);
console.warn('Warning:', message);
```

### Check localStorage
```javascript
// In browser console (F12)
Object.keys(localStorage)           // See all keys
localStorage.getItem('agenda')      // View one item
JSON.parse(localStorage.getItem('agenda'))  // Parse JSON
localStorage.clear()                // Clear all
```

### TypeScript errors
```bash
npm run lint        # Show all errors
tsc --noEmit        # Type check only
```

### React DevTools
1. Install "React DevTools" browser extension
2. Open DevTools (F12)
3. Go to "Components" tab
4. Inspect component state and props

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind CSS breakpoints
sm: 640px    // sm:block (show on small screens)
md: 768px    // md:hidden (hide on medium+)
lg: 1024px   // lg:grid-cols-3
xl: 1280px
2xl: 1536px
```

Used in app: `md:` breakpoint (768px) for mobile/desktop switch

---

## 🎨 Color Reference

```
Primary (Indigo):     #4F46E5 → bg-indigo-600
Work (Blue):          #3B82F6 → bg-blue-600
Private (Pink):       #EC4899 → bg-pink-600
Success (Green):      #10B981 → bg-green-600
Background (Gray):    #F9FAFB → bg-gray-50
Text (Dark Gray):     #111827 → text-gray-900
```

---

## ✨ Tailwind Utility Reference

```css
/* Display & Sizing */
.flex                 /* Display: flex */
.grid                 /* Display: grid */
.w-full              /* Width: 100% */
.h-screen            /* Height: 100vh */
.max-w-3xl           /* Max width: 48rem */

/* Spacing */
.p-4                 /* Padding: 1rem */
.m-2                 /* Margin: 0.5rem */
.gap-3               /* Gap between flex/grid: 0.75rem */
.mb-4                /* Margin bottom: 1rem */

/* Text */
.text-center         /* Text align: center */
.text-lg             /* Font size: 1.125rem */
.font-bold           /* Font weight: 700 */
.text-gray-700       /* Text color */

/* Background & Borders */
.bg-white            /* Background white */
.border-l-4          /* Left border */
.rounded-lg          /* Border radius */
.shadow-md           /* Box shadow */

/* Responsive */
.md:hidden           /* Display: none on md+ */
.md:block            /* Display: block on md+ */
.md:grid-cols-2      /* 2 columns on md+ */
```

---

## 🔍 Search & Replace Tips

### Find all TODO comments
```bash
grep -r "TODO" src/
```

### Find component usage
```bash
grep -r "AgendaView" src/
```

### Find in VS Code
- Ctrl+F: Find
- Ctrl+H: Find & Replace
- Ctrl+Shift+F: Find across files

---

## 📦 npm Scripts Reference

```json
{
  "dev": "vite",                           // Start dev server
  "build": "tsc -b && vite build",         // TypeScript + Vite build
  "preview": "vite preview",               // Preview production
  "lint": "eslint ."                       // Check for errors
}
```

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] npm run lint (no errors)
- [ ] npm run build (builds successfully)
- [ ] npm run preview (looks correct)
- [ ] Test on mobile device
- [ ] Check LocalStorage works
- [ ] Test add/delete functionality
- [ ] Verify responsive design
- [ ] Check console for errors (F12)

---

## 💡 Performance Tips

```typescript
// Use React.memo for heavy components
export const MyComponent = React.memo(({ items }) => {
  return <div>{items.length}</div>;
});

// Use useCallback for stable functions
const handleClick = useCallback(() => {
  addItem(newItem);
}, []);

// Use useMemo for expensive calculations
const sorted = useMemo(() => {
  return items.sort((a, b) => a.date - b.date);
}, [items]);
```

---

## 🎯 Testing Commands

```bash
# Check TypeScript
npm run lint

# Full build test
npm run build

# Preview production
npm run preview

# Clean rebuild
rm -r dist && npm run build

# Check what changed
git status
git diff
```

---

## 📝 Git Commands (if using version control)

```bash
git status              # See changes
git add .               # Stage all changes
git commit -m "message" # Commit
git push                # Push to remote
git log                 # See history
git diff                # See what changed
```

---

## 🆘 Emergency Fixes

### App won't start
```bash
npm install          # Reinstall dependencies
npm run dev
```

### React errors
- Check browser console (F12)
- Look for red errors with line numbers
- Comment out recent changes

### TypeScript errors
```bash
npm run lint
# Read error message and fix line number
```

### Build fails
```bash
rm -r dist
npm run build
# Check error output
```

---

**Version**: 1.0.0 | Last Updated: February 2026

*Keep this handy while developing!* 📌
