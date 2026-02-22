/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-void': '#0a0a0b',
        'bg-surface': '#111114',
        'bg-card': '#161619',
        'bg-elevated': '#1c1c20',
        'border-subtle': 'rgba(255,255,255,0.06)',
        'border-mid': 'rgba(255,255,255,0.12)',
        'acid-green': '#b8ff00',
        'acid-green-glow': 'rgba(184,255,0,0.25)',
        'acid-green-dim': 'rgba(184,255,0,0.08)',
        'crimson': '#e8283c',
        'crimson-glow': 'rgba(232,40,60,0.25)',
        'crimson-dim': 'rgba(232,40,60,0.08)',
        'amber': '#ffb800',
        'text-primary': '#f0f0f2',
        'text-secondary': 'rgba(240,240,242,0.5)',
        'text-muted': 'rgba(240,240,242,0.28)',
      },
      fontFamily: {
        'display': "'Syne', sans-serif",
        'mono': "'Space Mono', monospace",
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '18px',
        'xl': '28px',
      },
    },
  },
  plugins: [],
}