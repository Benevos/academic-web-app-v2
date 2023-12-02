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
        'blue-opacity': 'rgba(29, 37, 45, 0.95)',
        'blue-1': '#00426A',
        'blue-2': '#376986', 
        'blue-3': '#698ea4',
        'blue-4': '#9bb4c3',
        'blue-5': '#cdd9e1',
        'blue-6': '#00426a',
        'orange-1': '#B86125',
        'orange-2': '#c98153',
        'orange-3': '#d6a17e',
        'orange-4': '#e4c0a9',
        'orange-5': '#f1e0d4',
        'auxiliar-1': '#4070B6',
        'auxiliar-2': '#61B0CC',
        'auxiliar-3': '#81C6CC',
        'auxiliar-4': '#ECB06F',
        'auxiliar-5': '#F7C46E',
      }
    },
  },
  plugins: [],
}
