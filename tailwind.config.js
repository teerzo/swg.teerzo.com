/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        imperial: {
          "primary": "#b5babd",
          "secondary": "#2c4ebf",
          "accent": "#f97316",
          "neutral": "#2b3440",
          "base-100": "#1d232a",
          "black": "#0f1215",

          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      {
        rebel: {
          "primary": "#333333",
          "secondary": "#BC1E22",
          "accent": "#f97316",
          "neutral": "#2b3440",
          "base-100": "#ffffff",

          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    darkMode: ["class", '[data-theme="imperial"]'],
    base: true,
    utils: true,
  },
}