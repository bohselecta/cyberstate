/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CyberState color palette
        'cyber-green': {
          50: '#e6ffed',
          100: '#ccffdb',
          200: '#99ffb7',
          300: '#66ff93',
          400: '#33ff6f',
          500: '#00FF00', // Primary green
          600: '#00cc00',
          700: '#009900',
          800: '#006600',
          900: '#003300',
          950: '#001a00',
        },
        'cyber-amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FF9500', // Primary amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        'cyber-bg': '#0A0A0A',
        'cyber-panel': '#111111',
        'cyber-text': '#ffffff',
      },
      fontFamily: {
        'mono': ['Orbitron', 'Courier New', 'monospace'],
        'cyber': ['Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 255, 0, 0.3)',
        'cyber-amber': '0 0 20px rgba(255, 149, 0, 0.3)',
        'cyber-inset': 'inset 0 0 20px rgba(0, 255, 0, 0.3)',
        'cyber-inset-amber': 'inset 0 0 20px rgba(255, 149, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 0, 0.8)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
