const helpers = {
  ss: {
    /* Small only 768- */
    sm: '@media only screen and (max-width: 48rem)',
    /* Medium and up 768+ */
    md: '@media screen and (min-width: 48rem)',
    /* Medium only 768-980 */
    mdo: '@media screen and (min-width: 48rem) and (max-width: 61.250rem)',
    /* Large and up 980+ */
    lg: '@media screen and (min-width: 61.250rem)',
    /* Large only 980-1199 */
    lgo: '@media screen and (min-width: 61.250rem) and (max-width: 74.9375rem)'
  },
  c: {
     blue: '#1c81e3',
     red: '#e11825',
     black: '#000',
     white: '#FFF',
     teal: '#00d1b2',
     green: '#74c947',
     lightGrey: '#dfe6ec',
     midGrey: '#c4cacd',
     grey: '#666',
     darkGrey: '#333',
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
