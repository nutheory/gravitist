const helpers = {
  ss: {
    /* Small only 639- */
    sm: '@media only screen and (max-width: 39.9375rem)',
    /* Medium and up 640+ */
    md: '@media screen and (min-width: 40rem)',
    /* Medium only 640-1023 */
    mdo: '@media screen and (min-width: 40rem) and (max-width: 63.9375rem)',
    /* Large and up 1024+ */
    lg: '@media screen and (min-width: 64rem)',
    /* Large only 1024-1199 */
    lgo: '@media screen and (min-width: 64rem) and (max-width: 74.9375rem)'
  },
  c: {
     blue: '#1c81e3',
     red: '#e11825',
     black: '#000',
     white: '#FFF',
     teal: '#00d1b2',
     lightGrey: '#dfe6ec',
     midGrey: '#c4cacd',
     grey: '#999',
     darkBlue: '#0d2b47',
     midnightBlue: '#102f39',
  },
  colors: {
    blue: '#1c81e3',
    red: '#e11825',
    black: '#000',
    white: '#FFF',
    teal: '#00d1b2',
    lightGrey: '#dfe6ec',
    midGrey: '#c4cacd',
    grey: '#999',
    darkBlue: '#0d2b47',
  }
}

module.exports = helpers
