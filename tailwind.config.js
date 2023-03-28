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
        sun: {
          '100%': { 
            transform: 'translate(0px, 0px) rotate(360deg)'
          },
          '50%':{
            transform: 'translate(200px, 500px) rotate(180deg) '
          }
        },

        fade:{
          '0%, 100%':{
            opacity: 1
          },
          '50%':{
            opacity: 0
          }
        },

        test:{
          '100%':{
            'background-color' : 'red'
          },
          '50%':{
            'background-color' : 'green'
          }
        }
      },
      animation: {
        'spin-slow' : 'spin 12s linear infinite',
        'sun' : 'spin 16s linear infinite',
        'fade' : 'fade 12s linear infinite',
        'test' : 'test 8s linear infinite'
      }
    }
  },
  plugins: [],
}