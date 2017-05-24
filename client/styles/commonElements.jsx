import { StyleSheet, css } from 'aphrodite'
import { scrSize } from './cssFunc'
import Colors from './colors'

const commonElements = StyleSheet.create({
  iconImg: {
    width: '64px',
    height: '64px',
  },
  callToAction: {
    width: '100%',
    height: '64px',
    color: Colors.white,
    borderRadius: '32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    width:'80%',
    flexWrap: 'wrap',
  },
  cta: {
    fontFamily: 'poppins-semibold',
    borderRadius: '32px',
    width: '260px',
    height: '64px',
    margin: '20px',
    color: Colors.white,
    position: 'relative',
    zIndex: '10',
    textDecoration: 'none',
    textTransform: 'uppercase',
    boxShadow: '1px 1px 2px #0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [scrSize.desktop]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
    [scrSize.smartphone]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    }
  },
  redButton: {
    backgroundColor: Colors.red,
  },
  blueButton: {
    backgroundColor: Colors.blue,
  },
})

export default commonElements
