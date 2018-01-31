// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const hero = StyleSheet.create({
  wrapper: {
    width: '90%',
    position: 'relative',
    zIndex: '1'
  },
  synopsis: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    margin: '0',
    display: 'flex',
    alignItems: 'right',
    flexDirection: 'column',
    color: c.white,
    position: 'relative',
    textAlign: 'right',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    [ss.sm]: {
      width: '90%',
      fontSize: '1.6rem',
    },
    [ss.lg]: {
      width: '50%',
      marginLeft: '50%',
      fontSize: '3.6rem',
      lineHeight: '4.4rem'
    },
  },
  ctaButtons: {
    width: '100%',
    marginTop: '40px',
    textAlign: 'right',
  },
  ctaButtonRight: {
    display: 'inline-block',
    width: '20rem',
  },
  ctaButtonLeft: {
      display: 'inline-block',
    width: '20rem',
    marginRight: '40px'
  }
})

export default hero
