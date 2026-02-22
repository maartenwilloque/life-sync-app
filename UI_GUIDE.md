# Life Sync - UI Features & Visual Guide

## 📱 Mobile Layout (< 768px)

```
┌─────────────────────────┐
│  Add Agenda Item Button │
│  ┌─────────────────────┐│
│  │ Title Input         ││
│  │ Date: [__________]  ││
│  │ Time: [__________]  ││
│  │ Type: [Dropdown]    ││
│  │ Category: [Dropdown]││
│  └─────────────────────┘│
├─────────────────────────┤
│ 📅 Work Item 1     ✓    │
│    Today at 14:00       │
├─────────────────────────┤
│ 👤 Private Item 1  ○    │
│    Tomorrow at 10:00    │
├─────────────────────────┤
│ 📅 Team Meeting    ○    │
│    Friday at 15:30      │
├─────────────────────────┤
│  Agenda │ Shopping (TAB) │  ← Bottom Navigation
└─────────────────────────┘
```

## 🖥️ Desktop Layout (> 768px)

```
┌────────────────────────────────────────────────┐
│          Life Sync - Personal & Work           │
│               Manage your life                 │
└────────────────────────────────────────────────┘

┌──────────┐  ┌──────────────────────────────┐
│ ▶ Agenda │  │  Add Agenda Item             │
│ ▸ Shop   │  │  ┌────────────────────────┐  │
│ ▸ Config │  │  │ Title: [____________]  │  │
│          │  │  │ Date: [___] Time: [__] │  │
│          │  │  │ Type: [Pick] Cat: [__] │  │
│          │  │  │ [Add Item]  [Cancel]   │  │
│          │  │  └────────────────────────┘  │
│          │  │                               │
│          │  │ 📅 WORK AGENDA (5 items)   │
│          │  │ ┌────────────────────────┐  │
│          │  │ │ ✓ Client call          │  │
│          │  │ │   Today at 14:00       │  │
│          │  │ └────────────────────────┘  │
│          │  │ ┌────────────────────────┐  │
│          │  │ │ ○ Finish report        │  │
│          │  │ │   Tomorrow at 10:00    │  │
│          │  │ └────────────────────────┘  │
│          │  │                               │
│          │  │ 👤 PRIVATE AGENDA (2 items) │
│          │  │ ┌────────────────────────┐  │
│          │  │ │ ○ Doctor appointment   │  │
│          │  │ │   Wednesday at 16:30   │  │
│          │  │ └────────────────────────┘  │
│          │  │                               │
└──────────┘  └──────────────────────────────┘
```

---

## 🛍️ Shopping List View

### Mobile
```
┌─────────────────────────┐
│  Add Item Button        │
│  ┌─────────────────────┐│
│  │ [Milk____________] ││
│  │      [Add Item]    ││
│  └─────────────────────┘│
├─────────────────────────┤
│ Progress: ████░░ 66%    │
├─────────────────────────┤
│ ○ Milk          [🗑️]   │
│ ○ Bread         [🗑️]   │
│ ✓ Butter        [🗑️]   │
├─────────────────────────┤
│      COMPLETED (1)      │
│ [Clear]                 │
│ ✓ Eggs          [🗑️]   │
├─────────────────────────┤
│ 🛒 Shopping (ACTIVE)    │
│ ▸ Agenda (INACTIVE)     │
└─────────────────────────┘
```

---

## 🎨 Color Usage

### Category Indicators
```
Work Item     → Blue (#3B82F6) left border
Private Item  → Pink (#EC4899) left border
Completed     → Green (#10B981) checkmark
Incomplete    → Gray (#9CA3AF) circle
```

### Background Highlights
```
Work Section    → Light Blue (#EFF6FF)
Private Section → Light Pink (#FCF2F7)
Hover Item      → Drop shadow + light gray
```

---

## 🔘 Button States

```
┌────────────────┐ ← Normal
│   Add Item     │
└────────────────┘

┌────────────────┐ ← Hover
│   Add Item     │
└────────────────┘  (shadow + darker)

┌────────────────┐ ← Disabled
│   Add Item     │
└────────────────┘  (grayed out)
```

---

## 📝 Form Fields

### Input Styling
```
Text Input:        [Type here_____]
Date Selector:     [2025-02-08]
Time Picker:       [14:00]
Dropdown Select:   [Choose Option ▼]
```

---

## ✅ Item States

### Agenda Item States
```
Incomplete:     ○ Item Title
                  Date at Time [trash]

Complete:       ✓ Item Title (crossed out)
                  Date at Time [trash]

Hover:          ○ Item Title
                  Date at Time [trash] ← Shadow effect
```

### Shopping Item States
```
To Buy:         ○ Milk [trash]
Bought:         ✓ Milk [trash] (dimmed)
```

---

## 📏 Responsive Behavior

### Screen Width < 768px (Mobile)
- Full width layout
- Bottom navigation tabs
- Vertical scrolling
- Stacked form inputs
- Touch-optimized (48px+ buttons)

### Screen Width ≥ 768px (Desktop)
- Sidebar navigation (fixed left)
- Main content area (left margin)
- Multi-column forms
- Hover effects enabled
- Sidebar width: 192px

---

## 🎯 Navigation States

### Agenda Tab Active
```
MOBILE:
┌─────────────────────┐
│  🗓️ Agenda (blue)   │
│     Shopping        │
└─────────────────────┘

DESKTOP:
┌──────────┐
│ 🗓️ Agenda│ ← Highlighted
│   Shop   │
│ Settings │
└──────────┘
```

### Shopping Tab Active
```
MOBILE:
┌─────────────────────┐
│  Agenda             │
│  🛒 Shopping (blue) │
└─────────────────────┘

DESKTOP:
┌──────────┐
│ Agenda   │
│ 🛒 Shop  │ ← Highlighted
│ Settings │
└──────────┘
```

---

## 📊 Progress Bar

```
Shopping Items: 3/5 complete

Progress Bar:
┌─────────────────────┐
│████████░░░░ 60%    │
└─────────────────────┘

Items Complete: 3
Items Total: 5
```

---

## 🔔 Empty States

### No Agenda Items
```
┌──────────────────────┐
│                      │
│    📅 (large icon)   │
│                      │
│  No agenda items yet │
│                      │
│  Start by adding a   │
│  task or meeting     │
│                      │
└──────────────────────┘
```

### No Shopping Items
```
┌──────────────────────┐
│                      │
│    🛍️ (large icon)   │
│                      │
│  Shopping list empty │
│                      │
│  Start by adding     │
│  items you need      │
│                      │
└──────────────────────┘
```

---

## 🎪 Icon Usage

### Buttons
```
[+ Add Agenda Item]      ← Plus icon for add
[🗑️ Delete]             ← Trash icon for delete
[✓ Complete]            ← Check icon for done
[○ Incomplete]          ← Circle for incomplete
```

### Headers
```
📅 Work Agenda (5)       ← Calendar icon
👤 Private Agenda (3)    ← User icon
🛒 Shopping List         ← Cart icon
```

### Date Display
```
⏰ Today at 14:00        ← Clock icon
📅 Tomorrow at 10:30     ← Calendar icon
📅 Friday at 16:00       ← Calendar icon
```

---

## 🎨 Font Sizing

```
Page Title:     24px (text-2xl)
Section Title:  20px (text-xl)
Item Title:     16px (text-base)
Metadata:       14px (text-sm)
Helper Text:    12px (text-xs)
```

---

## 🌈 Hover Effects

### Desktop Only
```
Items:          Add shadow, slight background change
Buttons:        Darker color, shadow effect
Links:          Color change, underline
Navigation:     Background highlight
```

### Mobile
```
Tap feedback:   Very subtle (no hover effects)
```

---

## ♿ Accessibility Features

```
✓ Semantic HTML
✓ Keyboard navigation (Tab, Enter)
✓ Focus visible states (outline)
✓ Color contrast (WCAG AA)
✓ Touch-friendly sizes (48px+)
✓ Label associations
✓ Aria roles where needed
✓ Mobile screen reader support
```

---

## 🔍 Form Focus State

```
Unfocused:  [Type something_____]

Focused:    [Type something_____] ← Blue outline
            (2px solid #4f46e5)

Error:      [Type something_____] ← Red outline
            (if validation needed)
```

---

## 📱 Safe Area Support

```
iPhone with notch:

    ╭─────────────╮
    │ ▲▲▲▲ NOTCH  │
    ├─────────────┤
    │  Content    │
    │  (safe)     │
    ├─────────────┤
    │ [Bottom Nav] ← Extra padding for home indicator
    ╰─────────────╯
```

---

**Version**: 1.0.0
**Last Updated**: February 2026

*This visual guide shows the complete UI/UX design of Life Sync!*
