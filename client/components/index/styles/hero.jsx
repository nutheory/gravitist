import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const hero = StyleSheet.create({
  wrapper: {
    width: '90%'
  },
  synopsis: {
    fontFamily: 'poppins-bold',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: c.white,
    textTransform: 'uppercase',
    position: 'relative',
    textAlign: 'center',
    zIndex: '10',
    textShadow: '1px 1px 2px #0a0a0a',
    [ss.lg]: {
      width: '75%',
      fontSize: '3.5rem',
    },
    [ss.md]: {
      width: '75%',
      fontSize: '3.5rem',
    },
    [ss.sm]: {
      width: '90%',
      fontSize: '1.6rem',
    }
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
  },
  bulletPoints: {
    display: 'flex',
    color: c.white,
    position: 'relative',
    flexWrap: 'wrap',
    zIndex: '10',
    fontSize: '1.5rem',
    justifyContent: 'center',
    textShadow: '1px 1px 2px #0a0a0a',
    [ss.lg]: {
      fontSize: '1.5rem',
    },
    [ss.sm]: {
      fontSize: '1rem',
      paddingLeft: '10px'
    }
  },
  point: {
    margin: '10px 40px',
    flexWrap: 'nowrap',
    [ss.sm]: {

    }
  },
  playIcon: {
    width: '22px',
    height: '22px',
    display: 'inline-block',
    marginRight: '10px',
  },
})

export default hero
