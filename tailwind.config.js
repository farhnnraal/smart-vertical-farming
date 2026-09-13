export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        leaf: {
          50: '#f1f8f2',
          100: '#ddeee2',
          200: '#bcddc7',
          300: '#8ec4a2',
          400: '#5ca67c',
          500: '#3d8b60',
          600: '#2f7d4f',
          700: '#24633e',
          800: '#1e4e33',
          900: '#17402b',
        },
        canvas: {
          DEFAULT: '#f7f8f6',
          card: '#ffffff',
          sunken: '#eff1ed',
        },
        ink: {
          900: '#20261f',
          700: '#3c443a',
          500: '#667062',
          400: '#8a9386',
        },
        state: {
          optimal: '#2f7d4f',
          optimalBg: '#eaf5ed',
          warning: '#b8730a',
          warningBg: '#fdf3e3',
          critical: '#c0392b',
          criticalBg: '#fdeeec',
          info: '#1f6fb2',
          infoBg: '#eaf3fb',
        },
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(32, 38, 31, 0.04), 0 1px 12px rgba(32, 38, 31, 0.04)',
        lift: '0 8px 28px rgba(32, 38, 31, 0.10)',
      },
    },
  },
  plugins: [],
};
