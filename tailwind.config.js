/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'dvh-screen': '100dvh'
      },
      backgroundColor:{
        'blue-opacity': 'rgba(29, 37, 45, 0.95)'
      }
    },
  },
  plugins: [],
}
