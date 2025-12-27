/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Rebel theme colors
        'rebel-red': '#e63946',
        'rebel-light': '#f1faee',
        'rebel-dark': '#1d3557',
        
        // Imperial theme colors
        'imperial-blue': '#1e3a8a',
        'imperial-light': '#f8fafc',
        'imperial-dark': '#0f172a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}