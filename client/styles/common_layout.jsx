import { StyleSheet, css } from 'aphrodite'
import { ss, c } from './helpers'

const commonLayout = StyleSheet.create({
  mSection: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  cSection: {
    display: 'block',
    marginBottom: '1rem'
  },
  splitHeader: {
    display: 'block',
    overflow:'auto'
  },
  centerMainContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  heroContainer: {
    display: 'block',
    height: '95vh',
    position: 'relative',
  },
  pricingContainer: {
    display: 'block',
    minHeight: '100vh',
    position: 'relative',
  },
  fourContainer: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  heroBg: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    height: '95vh',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center center',
  },
  specialHeroBg: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center center',
  },
  heroBgFull: {
    overflow: 'auto',
    minHeight: '100vh'
  },
  heroOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    // background: '#16222a',
    // background: '-webkit-linear-gradient(to bottom, #16222a, #3a6073)',
    // background: 'linear-gradient(to bottom, #16222a, #3a6073)',
    // opacity: '0.7',
  },
  pricingOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    background: '#6441A5',
    background: '-webkit-linear-gradient(to bottom, #2a0845, #000)',
    background: 'linear-gradient(to bottom, #2a0845, #000)',
    opacity: '0.8',
  },
  commonMarketingArea: {

  },
  centerSelf: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    [ss.sm]: {
      margin: '2rem 1rem'
    },
    [ss.md]: {
      margin: '3rem 1rem'
    },
    [ss.lg]: {
      margin: '4rem 1rem'
    }
  },
})

export default commonLayout
