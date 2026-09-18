/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // indigo-500 as primary material color
        surface: "var(--bg-surface)",
        background: "var(--bg-primary)",
        accent: "var(--accent-gold)"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};

