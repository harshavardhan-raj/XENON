/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2fbf5',
          100: '#e1f6e9',
          200: '#c3ecd2',
          300: '#94dbae',
          400: '#5dc083',
          500: '#38a462',
          600: '#2b844c',
          700: '#24693f',
          800: '#205434',
          900: '#1c452c',
          950: '#0b2617',
        },
        ochre: {
          50: '#fef9ee',
          100: '#fdf1d6',
          200: '#fae0ab',
          300: '#f6ca74',
          400: '#f1ad3e',
          500: '#ed921b',
          600: '#d07312',
          700: '#ad5412',
          800: '#8c4216',
          900: '#733716',
          950: '#421b08',
        },
        tribal: {
          earth: '#2C1D11',
          terracotta: '#D45D3A',
          amber: '#F59E0B',
          sarna: '#15803D',
          clay: '#8D5B4C',
          cream: '#FFFDF9',
          card: '#FFFFFF',
          dark: '#111827',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        olchiki: ['"Ol Chiki"', 'Outfit', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Outfit', 'sans-serif']
      },
      boxShadow: {
        'classroom': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'checkpoint': '0 12px 35px -8px rgba(34, 139, 34, 0.15)',
        'quicktrans': '0 10px 40px -10px rgba(217, 119, 6, 0.25)'
      }
    },
  },
  plugins: [],
}
