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
  b: {
    shadow: '1px 1px 2px #0a0a0a',
    radius: '4px',
  },
  c: {
     blue: '#1c81e3',
     bFgBlue: '#209cee',
     bTextBlue: '#12537e',
     bBgBlue: '#f6fbfe',
     red: '#e11825',
     bFgRed: '#ff3860',
     bBgRed: '#fff5f7',
     bTextRed: '#cd0930',
     bFgYellow: '#ffdd57',
     bTextYellow: '#3b3208',
     bBgYellow: '#fffdf5',
     black: '#000',
     white: '#FFF',
     teal: '#00d1b2',
     mint: '#a2e8b2',
     green: '#74c947',
     bFgGreen: '#23d160',
     bBgGreen: '#f5fffd',
     bTextGreen: '#0e311b',
     bFgBlue: '#209cee',
     bTextBlue: '#12537e',
     bBgBlue: '#f6fbfe',
     bFgSoftGrey: '#dbdbdb',
     bTextSoftGrey: '#4a4a4a',
     bBgSoftGrey: '#f5f5f5',
     bFgGrey: '#363636',
     bTextGrey: '#2a2a2a',
     bBgGrey: '#fafafa',
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
