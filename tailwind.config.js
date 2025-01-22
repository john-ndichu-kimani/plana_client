/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    // We'll comment out the datatable pattern for now
    // {
    //   pattern: /^datatable-.*/, // Safelist all datatable-* classes
    // },
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blue-to-violet': 'linear-gradient(to right, #4f46e5, #8b5cf6)',
      },
    },
    flowbite: {
      charts: true,
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}