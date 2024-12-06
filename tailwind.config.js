// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['ClashDisplay'], // Definiert 'clash' als Alias für deine Schriftart
      },
    },
  },
  plugins: [],
};


