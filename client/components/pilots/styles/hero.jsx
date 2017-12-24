import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const hero = StyleSheet.create({
  wrapper: {
    width: '90%',
    position: 'relative',
    zIndex: '1'
  },
  infoRight:{
    float: 'right',
    width: '40%'
  },
  synopsis: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    margin: '0',
    display: 'flex',
    alignItems: 'right',
    flexDirection: 'column',
    color: c.white,
    position: 'relative',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    [ss.sm]: {
      fontSize: '1.6rem',
    },
    [ss.lg]: {
      fontSize: '3.6rem',
      lineHeight: '4rem'
    },
  },
  infoText: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    color: c.white,
    fontSize: '2.0rem',
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
  button: {
    marginTop: '1rem',
    width: '50%'
  }
})

export default hero
