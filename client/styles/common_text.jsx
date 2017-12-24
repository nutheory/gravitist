import { StyleSheet, css } from 'aphrodite'
import { ss, c } from './helpers'

const commonText = StyleSheet.create({
  sectionHeader: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
    [ss.sm]: {
      fontSize: '1.4rem',
    },
    [ss.md]: {
      fontSize: '2rem',
    }
  },
  infoText: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    color: c.white,
    fontSize: '2.4rem',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    lineHeight: '3rem',
    [ss.sm]: {
      width: '100%',
    },
    [ss.lg]: {
      width: '100%',
    },
  },
  bigTitle: {
    textAlign:'center',
    textShadow: '2px 2px 2px #000',
    fontWeight: '100',
    margin: '2rem 0 ',
    color: c.white,
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '2.4rem',
  },
  smallTitle: {
    textAlign:'center',
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '1.25rem',
  },
  smallText: {
    textAlign:'center',
    fontSize: '0.875rem',
    lineHeight: '1.4rem'
  },
  bulletListTitle: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '3rem',
    lineHeight: '3.4rem',
    textShadow: '1px 1px 2px #666',
    textAlign: 'center',
    fontWeight: '100'
  },
  bulletListText: {
    margin: '4px 0 4px 6rem',
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '1.6rem',
    lineHeight: '1.8rem',
    textShadow: '1px 1px 2px #666',
    fontWeight: '100'
  },
  bulletListTextSmall: {
    margin: '4px 0 4px 6rem',
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '1.0rem',
    lineHeight: '1.4rem',
    fontWeight: '300'
  },
  infoAreaText: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '3rem',
    textShadow: '1px 1px 2px #666',
    fontWeight: '100'
  }

})

export default commonText
