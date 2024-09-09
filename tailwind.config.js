/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./scripts/**/*.{html,js}",
    "./scripts/02-views/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-peach': '#EDEDED'
      },
      container: {
        center: true,
      },
      backgroundImage: {
        'hero-pattern': "url('../assets/hero/hero-bg.jpeg')",
        'cross-svg': "url('../assets/cross.svg')"
      },
      fontFamily: {
        'title': ["Anton", "sans-serif"],
        'body': ["Manrope", "sans-serif"],
      },
      gridTemplateColumns: {
        'auto-fit-280': 'repeat(auto-fit, 380px)',
      },
    },
  },
  plugins: [],
}

