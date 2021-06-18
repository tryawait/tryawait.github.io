const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    // Use `postcss-import`
    // https://tailwindcss.com/docs/installation#include-tailwind-in-your-css
    // https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports
    require('postcss-import'),
    // Add `tailwindcss` with config
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    // Use `cssnano` to minimize the css file
    require('cssnano')({
      preset: 'default',
    }),
    // Support css nest
    require('postcss-nesting'),
  ]
}