# Life Sync - Personal & Work Agenda Manager

A modern, responsive React application for managing your work and private agenda, including meetings, tasks, and shopping lists. Built with TypeScript, Tailwind CSS, and optimized for both mobile and desktop browsers.

## ✨ Features

- 📅 **Dual Agenda System**: Separate Work and Private calendars
- 🤝 **Meetings & Tasks**: Plan and track both meetings and tasks with specific times
- 🛒 **Shopping Lists**: Create and manage shopping items with progress tracking
- 📱 **Fully Responsive**: Mobile-first design for phones, tablets, and desktops
- 💾 **Local Storage**: All data automatically synced to browser's local storage
- ⚡ **Real-time Sync**: Changes persist across browser sessions
- 🎯 **Smart Date Formatting**: Intelligent date display (Today, Tomorrow, specific dates)
- 🏷️ **Category Organization**: Separate work and personal items with visual distinction

## 🛠️ Tech Stack

- **React** 19.2.0 - UI framework
- **TypeScript** 5.9 - Type safety
- **Tailwind CSS** 3.4 - Utility-first styling
- **Vite** 7.2 - Lightning-fast build tool
- **Lucide React** 0.563 - Beautiful icon library
- **date-fns** 4.1 - Modern date utility library
- **clsx & tailwind-merge** - CSS class management

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn

### Installation & Running

1. Navigate to the project:
   ```bash
   cd c:\Maarten\life-sync-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## 📖 Usage Guide

### Agenda View
1. Click **"Add Agenda Item"** button
2. Fill in:
   - **Title**: Name of your task or meeting
   - **Date**: When it's scheduled
   - **Time**: What time it occurs
   - **Type**: Meeting or Task
   - **Category**: Work or Private
3. Click **"Add Item"** to save

**Features:**
- Items automatically sorted by date/time
- Click circle to mark complete
- Completed items show with checkmark
- Delete with trash icon
- Blue border = Work, Pink border = Private

### Shopping View
1. Click **"Add Item"** button
2. Enter item name
3. Click **"Add Item"** to save

**Features:**
- Progress bar shows completion percentage
- Click circle to mark items bought
- Delete individual items
- Click **"Clear"** to remove completed items

### Navigation

**Mobile** (Bottom tabs):
- Tap icons to switch views
- Takes advantage of full screen width

**Desktop** (Sidebar):
- Navigation on left
- More content space
- Better for productivity

## 💾 Data Management

### How Data is Stored
- **Format**: JSON in browser's LocalStorage
- **Persistence**: Data survives browser restarts
- **Offline**: Works completely without internet

### Storage Details
- Agenda items: `localStorage['agenda']`
- Shopping items: `localStorage['shopping']`

### Backing Up Data
Export via browser DevTools:
1. Open DevTools (F12)
2. Go to Application tab
3. Find and copy the JSON data

### Clearing Data
In browser DevTools:
1. Application → Local Storage
2. Find your domain
3. Delete entries or entire storage

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Mobile/desktop navigation
│   ├── AgendaView.tsx       # Agenda management
│   └── ShoppingView.tsx     # Shopping list management
├── hooks/
│   └── useStore.ts          # State management with localStorage
├── utils/
│   └── dateUtils.ts         # Date formatting utilities
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Main app component
├── main.tsx                 # React entry point
├── index.css                # Global styles
└── App.css                  # Component styles
```

## 🎨 Design

### Responsive Breakpoints
- **Mobile**: < 768px (bottom navigation)
- **Tablet**: 768px - 1024px (sidebar navigation)
- **Desktop**: > 1024px (full sidebar navigation)

### Color Scheme
- **Primary**: Indigo (#4F46E5)
- **Work**: Blue (#3B82F6)
- **Private**: Pink (#EC4899)
- **Success**: Green (#10B981)
- **Background**: Gray (#F9FAFB)

### Accessibility
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ ARIA labels
- ✅ Color contrast compliant
- ✅ Mobile screen reader support

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS/Android)

## ⚙️ Available Commands

```bash
npm run dev       # Start development server with HMR
npm run build     # Build for production (TypeScript + Vite)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint checks
```

## 🔮 Future Enhancements

Planned features:
- 🔔 Push notifications & reminders
- 📤 Export to iCal/CSV formats
- 🌙 Dark mode toggle
- 📊 Statistics & analytics
- 🏷️ Custom categories
- 🔐 Password protection
- ☁️ Cloud sync capability
- 👥 Sharing & collaboration

## 🐛 Troubleshooting

### Data Not Saving?
- Ensure LocalStorage is enabled in browser
- Check browser's storage quota
- Try clearing cache and reloading

### Items Not Appearing?
- Refresh the page (Ctrl+F5)
- Check browser console for errors
- Verify items were successfully added

### Performance Issues?
- Clear completed shopping items regularly
- Delete old agenda items
- Use latest browser version
- Check available disk space

## 💡 Pro Tips

1. **Mobile App**: Add to home screen for app-like experience
2. **Productivity**: Check both agendas daily
3. **Organization**: Use categories effectively
4. **Maintenance**: Archive old items regularly
5. **Backup**: Periodically export important data

## 📱 Mobile Optimization

The app is fully optimized for mobile:
- Touch-friendly button sizes
- Optimized for small screens
- Safe area support for notches
- Vertical scrolling layout
- Fast performance on slower networks

## 🔐 Security & Privacy

- **No Data Sent Online**: Everything stays in your browser
- **No Analytics**: No tracking or user monitoring
- **No Ads**: Pure utility application
- **Local Only**: Complete offline capability

## License

Created for personal use. Free to modify and distribute.

---

**Version**: 1.0.0  
**Built with**: React + TypeScript + Tailwind CSS  
**Last Updated**: February 2026
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
