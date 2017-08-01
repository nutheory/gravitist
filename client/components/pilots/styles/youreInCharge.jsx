import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const youreInCharge = StyleSheet.create({
  container: {
    width: '100%',
    background: c.blue,
    overflow: 'auto'
  },
  formatter: {
    justifyContent: 'space-between',
    display: 'flex',
    [ss.sm]: {
      flexDirection: 'column',
    },
    [ss.md]: {
      flexDirection: 'row',
      width: '100%',
      margin: 'auto',
    },
    [ss.lg]: {
      maxWidth: '1100px',
    },
  },
  youreInCharge: {
    position: 'relative',
    color: c.white,
    [ss.sm]: {
      width: '100%',
    },
    [ss.md]: {
      width: '45%',
    }
  },
  arrowLayout: {
    position: 'absolute',
    bottom: '50px',
    right: '-70px',
    width: '110px',
    height: '24px',
    [ss.sm]: {
      display: 'none',
    }
  },
  arrowIcon: {
    width: '110px',
    height: '24px',
  },
  signupOnline: {
    background: c.white,
    overflow: 'auto',
    [ss.sm]: {
      width: '100%',
    },
    [ss.md]: {
      width: '45%'
    }
  },
  yicWrapper: {
    margin: '0rem 1rem 3rem 1rem',
  },
  soWrapper: {
    margin: '3rem 1rem',
  },
  buttonWrapper: {
    [ss.sm]: {
      padding: '0 0.8rem',
      margin: '2rem auto 0.8rem auto',
    },
    [ss.md]: {
      padding: '0 2rem',
      margin: '2rem auto 0.8rem auto',
    },
  },
  buttonIcon: {
    width: '20px',
    height: '24px',
    display: 'inline-block',
    marginRight: '0.6rem',
  },
  yicHeader: {
    fontSize: '1.6rem',
    [ss.sm]: {
      textAlign: 'center',
    },
    [ss.md]: {
      textAlign: 'left',
    },
  },
  soHeader: {
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    fontSize: '1.6rem',
  },
  yicTitle: {
    fontSize: '1.4rem',
    [ss.sm]: {
      textAlign: 'center',
    },
    [ss.md]: {
      textAlign: 'left',
    },
  },
  yicText: {
    fontFamily: 'poppins-light',
    [ss.sm]: {
      textAlign: 'center',
      fontSize: '1rem',
      lineHeight: '1.6rem',
      marginBottom: '1.6rem',
    },
    [ss.md]: {
      textAlign: 'left',
      fontSize: '1.2rem',
      lineHeight: '2rem',
      marginBottom: '2rem',
    },
  },
  smallText:{
    padding: '0 1rem',
    color: c.grey,
  },
  blueText: {
    textTransform: 'uppercase',
    color: c.blue,
    textAlign: 'center',
    [ss.sm]: {
      fontSize: '1rem',
      lineHeight: '1.4rem'
    },
    [ss.md]: {
      fontSize: '1.2rem',
      lineHeight: '1.6rem'
    },
  }
})

export default youreInCharge
