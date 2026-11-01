/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F8F2',
          warm: '#F7F8F2',
          50: '#FDFCF9',
          100: '#F7F8F2',
          200: '#F0F2EB',
          300: '#E5E9E1',
          400: '#DDD8CB',
        },
        forest: {
          DEFAULT: '#174D35',
          600: '#1E6344',
          700: '#174D35',
          800: '#133E2B',
          900: '#0E2D1F',
          950: '#081C13',
        },
        sage: {
          DEFAULT: '#A8C5A0',
          50: '#F5F8F4',
          100: '#EAF0E9',
          200: '#CFDDCF',
          300: '#A8C5A0',
          400: '#8EAA8E',
          500: '#78A85A',
          600: '#557555',
          700: '#425C42',
        },
        accent: {
          DEFAULT: '#78A85A',
          fresh: '#78A85A',
          sage: '#A8C5A0',
        },
        border: {
          soft: '#E5E9E1',
        },
        agri: {
          50: '#F5F9F5',
          100: '#E8F3E8',
          200: '#CBE5CB',
          300: '#A8C5A0',
          400: '#78A85A',
          500: '#5C9142',
          600: '#347C34',
          700: '#174D35',
          800: '#133E2B',
          900: '#0E2D1F',
          950: '#081C13',
        },
        charcoal: {
          DEFAULT: '#202820',
          900: '#202820',
          800: '#2A352A',
          700: '#3F4C44',
          500: '#66746B',
          400: '#8B978F',
          200: '#E5E9E1',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          'system-ui',
          '"Plus Jakarta Sans"',
          'Inter',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      boxShadow: {
        'ios-sm': '0 1px 3px rgba(22, 51, 36, 0.04), 0 1px 2px rgba(22, 51, 36, 0.02)',
        'ios': '0 4px 16px -2px rgba(22, 51, 36, 0.06), 0 2px 6px -1px rgba(22, 51, 36, 0.03)',
        'ios-lg': '0 12px 32px -4px rgba(22, 51, 36, 0.08), 0 4px 12px -2px rgba(22, 51, 36, 0.04)',
        'ios-glass': '0 8px 32px 0 rgba(22, 51, 36, 0.07)',
      }
    },
  },
  plugins: [],
}

