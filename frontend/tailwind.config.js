/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#150308',
          900: '#1E060D',
          850: '#2A0813',
          800: '#380B18',
          700: '#4B0F1E',
          600: '#6D1D32',
          500: '#8E2B44',
          400: '#B23C59',
          300: '#CC5671',
          200: '#E07A94',
          100: '#F7D6DC',
          50: '#FAF7F5',
        },
        theme: {
          bg: 'var(--bg-main)',
          secondary: 'var(--bg-secondary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          card: 'var(--bg-card)',
          primary: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          border: 'var(--border-color)',
          borderSubtle: 'var(--border-subtle)',
        },
        brand: {
          accent: {
            DEFAULT: '#B23C59',
            hover: '#CC5671',
            active: '#8E2B44',
            light: '#F7D6DC',
          },
          status: {
            available: '#2DD4BF',
            occupied: '#B23C59',
            active: '#E07A94',
            maintenance: '#71717A',
          }
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif']
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      }
    },
  },
  plugins: [],
}