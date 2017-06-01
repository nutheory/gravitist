const helpers = {
  scrSize: {
    /* Small only 639- */
    small: '@media only screen and (max-width: 39.9375rem)',
    /* Medium and up 640+ */
    medium: '@media screen and (min-width: 40rem)',
    /* Medium only 640-1023 */
    mediumOnly: '@media screen and (min-width: 40rem) and (max-width: 63.9375rem)',
    /* Large and up 1024+ */
    large: '@media screen and (min-width: 64rem)',
    /* Large only 1024-1199 */
    largeOnly: '@media screen and (min-width: 64rem) and (max-width: 74.9375rem)'
  },
  colors: {
     blue: '#1c81e3',
     red: '#e11825',
     black: '#000',
     white: '#FFF',
     lightGrey: '#dfe6ec',
     midGrey: '#c4cacd',
     grey: '#999',
     darkBlue: '#0d2b47',
  }
}

module.exports = helpers
