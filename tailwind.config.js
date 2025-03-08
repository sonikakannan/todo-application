defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    darkMode: "class", // Enable class-based dark mode
    experimental: {
        darkModeVariant: true
    },
    purge: [],
  theme: {
      extend: {
          fontFamily: {
              sans: ['Nunito', ...defaultTheme.fontFamily.sans],
          },
          screens: {
              'dark': {'raw': '(prefers-color-scheme: dark)'},
              // => @media (prefers-color-scheme: dark) { ... }
          },
      },
  },
  variants: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      borderColor: ['dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
      textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder'],
      opacity: ['responsive', 'hover', 'focus', 'disabled']
  },
  plugins: [require('tailwindcss-dark-mode')()],
}


defaultTheme = require('tailwindcss/defaultTheme');