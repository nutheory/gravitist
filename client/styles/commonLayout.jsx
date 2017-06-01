import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from './helpers'

const commonLayout = StyleSheet.create({
  centerMainContent: {
    paddingTop: '50px',
    position: 'relative',
    zIndex: '100',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  heroContainer: {
    display: 'block',
    height: '95vh',
    position: 'relative',
  },
  fourContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(top, rgba(192, 192, 170, 0.1), rgba(28, 239, 255, 0.1))',
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
  heroOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    background: '#16222a',
    background: '-webkit-linear-gradient(to bottom, #16222a, #3a6073)',
    background: 'linear-gradient(to bottom, #16222a, #3a6073)',
    opacity: '0.7',
  },
  commonMarketingArea: {

  },
  centerSelf: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    [scrSize.small]: {
      margin: '2rem 1rem'
    },
    [scrSize.medium]: {
      margin: '3rem 1rem'
    },
    [scrSize.large]: {
      margin: '4rem 4rem'
    }
  },
})

export default commonLayout
