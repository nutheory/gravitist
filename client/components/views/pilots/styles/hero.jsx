import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const hero = StyleSheet.create({
  container: {
    display: 'block',
    height: '70vh',
    position: 'relative',
  },
  bg: {
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    [ss.desktop]: {
      backgroundPosition: 'center center',
    },
    [ss.smartphone]: {
      backgroundPosition: 'center center',
    }
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    background: '#16222a',
    background: '-webkit-linear-gradient(to bottom, #16222a, #3a6073)',
    background: 'linear-gradient(to bottom, #16222a, #3a6073)',
    opacity: '0.7',
  },
  subText: {
    position: 'relative',
    zIndex: '10',
    fontFamily: 'poppins-semibold',
    color: c.white,
    textAlign: 'center',
    textShadow: '1px 1px 2px #0a0a0a',
    [ss.desktop]: {
      fontSize: '1.5rem',
    },
    [ss.smartphone]: {
      fontSize: '1rem',
    }
  },
})

export default hero
