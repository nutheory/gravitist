import { StyleSheet, css } from 'aphrodite'
import { ss, c } from './helpers'

const commonElements = StyleSheet.create({
  iconImg: {
    width: '64px',
    height: '64px',
  },
  callToAction: {
    width: '100%',
    height: '64px',
    borderRadius: '32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    color: c.white,
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
    color: c.white,
    position: 'relative',
    zIndex: '10',
    textDecoration: 'none',
    textTransform: 'uppercase',
    boxShadow: '1px 1px 2px #0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [ss.sm]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
  },
  redButton: {
    color: c.white,
    backgroundColor: c.red,
    [ss.sm]: {
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      width: '260px',
      height: '64px',
    },
  },
  blueButton: {
    color: c.white,
    backgroundColor: c.blue,
    [ss.sm]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      margin: '20px 20px 20px 0',
      width: '260px',
      height: '64px',
    },
  },
  whiteButton: {
    color: c.midnightBlue,
    backgroundColor: c.white,
    [ss.sm]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
  },
  fourBoxArea: {
    display: 'flex',
    margin: '4rem auto 0 auto',
    justifyContent: 'space-between',
    [ss.sm]: {
      flexWrap: 'wrap',
      width: '100%',
    },
    [ss.md]: {
      flexWrap: 'wrap',
      width: '90%',
    },
    [ss.lg]: {
      width: '90%',
      maxWidth: '1280px'
    },
  },
  fiveBoxArea: {
    display: 'flex',
    margin: '4rem auto 0 auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    [ss.sm]: {
      flexWrap: 'wrap',
      width: '100%',
    },
    [ss.md]: {
      flexWrap: 'wrap',
      width: '90%',
    },
    [ss.lg]: {
      width: '90%',
      maxWidth: '1280px'
    },
  },
  fourBoxSingle: {
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    borderRadius: '4px',
    [ss.sm]: {
      margin: '1rem 1rem',
      width: '100%',
    },
    [ss.md]: {
      width: 'calc(40% - 3rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [ss.lg]: {
      width: 'calc(25% - 6rem)',
      margin: '0 1rem 2rem 1rem',
    },
  },
  fiveBoxSingle: {
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: '4px',
    [ss.sm]: {
      margin: '1rem 1rem',
      width: '100%',
    },
    [ss.md]: {
      width: 'calc(40% - 3rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [ss.lg]: {
      width: 'calc(33.3333% - 6rem)',
      margin: '0 1rem 2rem 1rem',
    },
  },
  imgIconWrapper: {
    width: '64px',
    margin: '0px auto 20px auto',
  },
  scrollDown: {
    position: 'absolute',
    maxWidth: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    left: '50%',
    marginLeft: '-90px',
    [ss.sm]: {
      bottom: '20px',
    },
    [ss.md]: {
      bottom: '30px',
    },
    [ss.lg]: {
      bottom: '40px',
    },
  },
  scrollDownInner:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    opacity: '0.7',
    ':hover': {
       opacity: '1'
    }
  },
  scrollDownIcon: {
    width: '26px',
    height: '26px',
  },
  scrollDownText: {
    display: 'inline-block',
    marginTop: '10px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#fff',
  },
})

export default commonElements
