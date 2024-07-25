/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    backgroundImage: theme => ({
      'blue-to-violet': 'linear-gradient(to right, #4f46e5, #8b5cf6)', // Blue to violet gradient
    }),
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true
    })
  ],
}

