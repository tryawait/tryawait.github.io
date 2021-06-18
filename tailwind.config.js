module.exports = {
  purge: [
    './src/**/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
    }),
    extend: {
      backgroundColor: theme => ({
        'primary': '#fa6400',
        'secondary': theme('colors.gray.50'),
      }),
      textColor: theme => ({
        'primary': theme('colors.blue.600'),
        'secondary': theme('colors.gray.500'),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
