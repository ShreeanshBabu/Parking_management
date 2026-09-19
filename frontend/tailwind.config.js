/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--background)',
          surface: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
          card: 'var(--surface-card)',
          hover: 'var(--surface-hover)',
        },
        fg: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)',
        },
        accent: {
          DEFAULT: '#E11D48',
          hover: '#F43F5E',
          muted: '#881337',
          light: '#FFE4E6',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          neutral: '#71717A',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px -5px rgba(225, 29, 72, 0.25)',
      }
    },
  },
  plugins: [],
}
