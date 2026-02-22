# Life Sync - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Start the App
```bash
cd c:\Maarten\life-sync-app
npm install      # First time only
npm run dev
```

Open: `http://localhost:5174/`

### 2. Using the App

#### Agenda Tab
- Click **"Add Agenda Item"**
- Fill in: Title, Date, Time, Type (Task/Meeting), Category (Work/Private)
- Items appear below, sorted by date
- Click circle to mark complete
- Click trash to delete

#### Shopping Tab
- Click **"Add Item"**
- Enter item name
- Click circle when you buy it
- Click "Clear" to remove completed items

---

## 📱 Mobile Access

### On Your Phone
1. From dev server: Visit `http://<your-computer-ip>:5174`
   - Find your IP: `ipconfig` in Windows
2. Or build and deploy to free hosting (Vercel, Netlify)

### Add to Home Screen
- iPhone: Share → Add to Home Screen
- Android: Menu → Install App (Chrome)

---

## 💾 Your Data

- **Saved**: Browser's LocalStorage (survives restarts)
- **Online**: No data sent anywhere
- **Backup**: Data persists as long as browser cache exists
- **Clear**: DevTools → Application → Clear LocalStorage

---

## 🛠️ Common Commands

```bash
npm run dev        # Start development server (hot reload)
npm run build      # Create production build
npm run preview    # Preview production build locally
npm run lint       # Check for errors
```

---

## 🎯 Key Features

✅ Work & Private agendas
✅ Plan meetings and tasks
✅ Shopping lists with progress
✅ Mobile-friendly design
✅ Automatic data saving
✅ No server needed
✅ Works offline

---

## 📚 Full Documentation

See `README.md` for complete feature list
See `DEVELOPMENT.md` for detailed development guide

---

## 🚀 Deploy to Web

### Option 1: Vercel (1 minute)
```bash
npm install -g vercel
vercel
# Follow prompts, auto-deploys on git push
```

### Option 2: Netlify (Free)
- Connect GitHub
- Build: `npm run build`
- Publish: `dist/` folder

### Option 3: Any Static Host
- Run: `npm run build`
- Upload `/dist` folder
- Done!

---

## 💡 Tips

1. **Mobile First**: Bottom navigation for easy access
2. **Date Smart**: "Today", "Tomorrow", "Friday" formats
3. **Categories**: Blue = Work, Pink = Private
4. **Progress**: Shopping list shows completion %
5. **Sorting**: Agenda items auto-sort by date/time

---

**Version 1.0.0** | Built with React + TypeScript + Tailwind CSS
