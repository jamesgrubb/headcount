const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    filter:{
      'none': 'none',
      'grayscale': 'grayscale(1)',
      'invert': 'invert(1)',
      'sepia': 'sepia(1)'
    },
    backdropFilter:{
      'none': 'none',
      'blur': 'blur(20px)'
    },
    container: (theme) => ({
      center: true,
      spacing: theme('spacing.4')
    }),
    colors: {
      green: colors.teal,
      red: colors.rose,
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
    },
    extend: {
      colors: {
        'brand': {
          '50': '#f3f5f5', 
          '100': '#e8eaeb', 
          '200': '#c5cbcc', 
          '300': '#a3abad', 
          '400': '#5d6c70', 
          '500': '#182D32', 
          '600': '#16292d', 
          '700': '#122226', 
          '800': '#0e1b1e', 
          '900': '#0c1619'
      },
      'hot': '#F2390B'
      },
      fontFamily: {
        brand: ['Raleway', 'sans-serif'],
        tall: ['"Six Caps"']
        
      }
    },
  },
  variants: {
      mixBlendMode: ['responsive'],
      backgroundBlendMode: ['responsive'],
      isolation: ['responsive'],
    extend: {
      
    },
  },
  plugins: [
    require('tailwindcss-filters'),
    require('tailwindcss-blend-mode')(),
  ],
}
