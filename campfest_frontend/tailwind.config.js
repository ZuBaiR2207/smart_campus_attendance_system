export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f7ff',
          magenta: '#ff00ff',
          cyan: '#00ffd5',
          yellow: '#fffb00',
          green: '#39ff14',
        },
        glass: 'rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,255,255,0.2)' },
          '50%': { boxShadow: '0 0 10px 4px rgba(0,255,255,0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2s infinite',
        gradientShift: 'gradientShift 12s ease infinite',
      },
    },
  },
  plugins: [],
};