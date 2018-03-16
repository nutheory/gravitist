module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: ['last 2 versions', '> 5%'],
    }),
    require('tailwindcss')('./client/styles/tailwind.js')
  ]
}
