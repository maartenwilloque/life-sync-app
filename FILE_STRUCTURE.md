# Life Sync - Project File Structure

```
life-sync-app/
│
├── 📄 README.md                          # Main documentation
├── 📄 QUICKSTART.md                      # 5-minute setup guide
├── 📄 DEVELOPMENT.md                     # Complete dev guide
├── 📄 package.json                       # Dependencies & scripts
├── 📄 tsconfig.json                      # TypeScript config
├── 📄 tsconfig.app.json                  # App-specific TS config
├── 📄 tsconfig.node.json                 # Node TS config
├── 📄 vite.config.ts                     # Vite bundler config
├── 📄 index.html                         # HTML entry point
├── 📄 eslint.config.js                   # ESLint rules
├── 📄 tailwind.config.js                 # Tailwind config
├── 📄 postcss.config.js                  # PostCSS config
│
├── 📁 src/
│   ├── 📄 main.tsx                       # React root
│   ├── 📄 App.tsx                        # Main app component
│   ├── 📄 App.css                        # App styles
│   ├── 📄 index.css                      # Global styles
│   ├── 📄 types.ts                       # TypeScript interfaces
│   │
│   ├── 📁 components/                    # React components
│   │   ├── 📄 Navigation.tsx             # Navigation bar
│   │   ├── 📄 AgendaView.tsx             # Agenda interface
│   │   └── 📄 ShoppingView.tsx           # Shopping interface
│   │
│   ├── 📁 hooks/                         # Custom React hooks
│   │   └── 📄 useStore.ts                # State management
│   │
│   ├── 📁 utils/                         # Utility functions
│   │   └── 📄 dateUtils.ts               # Date formatting
│   │
│   └── 📁 assets/                        # Images, fonts, etc
│
├── 📁 public/                            # Static files (favicon, etc)
├── 📁 dist/                              # Production build (generated)
└── 📁 node_modules/                      # Dependencies (generated)
```

---

## 📄 File Descriptions

### Configuration Files
- **package.json**: Project metadata, dependencies, npm scripts
- **vite.config.ts**: Vite bundler settings
- **tsconfig.json**: TypeScript compiler options
- **tailwind.config.js**: Tailwind CSS customization
- **eslint.config.js**: Code quality rules
- **postcss.config.js**: CSS processing pipeline

### Source Files (src/)

#### Entry Point
- **main.tsx**: React app initialization
- **App.tsx**: Main app component with routing/state
- **index.html**: HTML template

#### Components (src/components/)
- **Navigation.tsx**: Responsive navigation for mobile/desktop
- **AgendaView.tsx**: Agenda management UI
- **ShoppingView.tsx**: Shopping list UI

#### Hooks (src/hooks/)
- **useStore.ts**: Custom hook for state management with localStorage

#### Utilities (src/utils/)
- **dateUtils.ts**: Date formatting and manipulation functions

#### Types (src/)
- **types.ts**: TypeScript interfaces for type safety

#### Styling (src/)
- **App.css**: Component-specific styles
- **index.css**: Global styles and Tailwind directives

---

## 🔄 Data Flow

```
User Action (Click button)
    ↓
Component Event Handler
    ↓
useStore Hook Action
    ↓
State Update
    ↓
LocalStorage Update
    ↓
Re-render Component
    ↓
UI Update
```

---

## 📦 Dependencies

### Main Libraries
```json
{
  "react": "^19.2.0",                    // UI framework
  "react-dom": "^19.2.0",                // React DOM rendering
  "typescript": "~5.9.3",                // Type safety
  "tailwindcss": "^3.4.17",             // CSS framework
  "vite": "^7.2.4",                     // Bundler
  "lucide-react": "^0.563.0",           // Icons
  "date-fns": "^4.1.0",                 // Date utilities
  "clsx": "^2.1.1",                     // Class name utility
  "tailwind-merge": "^3.4.0"            // Tailwind merge utility
}
```

---

## 🔍 Key Files to Modify

### To Add Features
1. Create component in `src/components/`
2. Add types to `src/types.ts`
3. Update `src/App.tsx` if needed
4. Add hook actions to `src/hooks/useStore.ts`

### To Change Styles
1. Modify Tailwind classes in components
2. Add CSS to `src/index.css` or `src/App.css`
3. Update `tailwind.config.js` for customization

### To Fix Bugs
1. Check `src/hooks/useStore.ts` for state issues
2. Review component logic in `src/components/`
3. Check browser console for errors
4. Run `npm run lint` for TypeScript errors

---

## 📊 Component Hierarchy

```
<App>
  ├── <Navigation>
  │   ├── Mobile Bottom Nav
  │   └── Desktop Sidebar Nav
  │
  └── (activeTab === 'AGENDA' ? <AgendaView> : <ShoppingView>)
      ├── <AgendaView>
      │   ├── Add Form
      │   ├── Work Agenda Section
      │   │   ├── Agenda Item 1
      │   │   ├── Agenda Item 2
      │   │   └── ...
      │   └── Private Agenda Section
      │       ├── Agenda Item 1
      │       ├── Agenda Item 2
      │       └── ...
      │
      └── <ShoppingView>
          ├── Add Form
          ├── Progress Bar
          ├── Active Items Section
          │   ├── Shopping Item 1
          │   ├── Shopping Item 2
          │   └── ...
          └── Completed Items Section
              ├── Completed Item 1
              ├── Completed Item 2
              └── ...
```

---

## 🗂️ How to Locate Things

| Looking For | Location |
|------------|----------|
| Main app logic | `src/App.tsx` |
| Type definitions | `src/types.ts` |
| State management | `src/hooks/useStore.ts` |
| Agenda feature | `src/components/AgendaView.tsx` |
| Shopping feature | `src/components/ShoppingView.tsx` |
| Navigation UI | `src/components/Navigation.tsx` |
| Global styles | `src/index.css` |
| Tailwind config | `tailwind.config.js` |
| Build output | `dist/` (after `npm run build`) |

---

## 🔧 Build Output Structure (dist/)

After running `npm run build`:

```
dist/
├── index.html                    # Main HTML file
├── assets/
│   ├── index-[hash].js          # Bundled JavaScript
│   ├── index-[hash].css         # Bundled CSS
│   └── [other assets]           # Images, fonts, etc
```

This `dist/` folder is what gets deployed to production.

---

## 📈 File Sizes (Approximate)

| File | Size | Notes |
|------|------|-------|
| JavaScript Bundle | ~230KB | Raw, ~70KB gzipped |
| CSS Bundle | ~15KB | Tailwind with utilities |
| HTML | <1KB | Minimal entry point |
| **Total** | **~246KB** | **~73KB gzipped** |

---

**Version**: 1.0.0
**Last Updated**: February 2026
