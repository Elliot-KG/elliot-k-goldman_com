/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      colors: {
      'night' : '#03032F',
      'pink' : '#FF8989'
      },
      fontFamily: {
        'main' : ['Raleway']
      },
      keyframes: {
        fade:{
          '0%, 25%, 100%':{
            opacity: 1
          },
          '50%':{
            opacity: 0
          }
        },

        sun:{
          '0%': { 
            transform: 'rotate(90deg)'
          },
          '25%':{
            transform: 'rotate(180deg)'
          },
          '50%':{
            transform: 'rotate(270deg)'
          },
          '75%':{
            transform: 'rotate(360deg)'
          },
          '100%':{
            transform: 'rotate(450deg)'
          }
        }
      },
      animation: {
        'spin-slow' : 'spin 12s linear infinite',
        'sun' : 'sun 16s linear infinite',
        'fade' : 'fade 16s linear infinite',
      }
    }
  },
  plugins: [],
}