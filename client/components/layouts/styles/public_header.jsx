import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const header = StyleSheet.create({
  absoluteHeader: {
    position: 'fixed',
    zIndex: '10',
    padding: '1.2rem 3rem',
    width: '100%'
  },
  bg: {
    position: 'fixed',
    top: '-120px',
    left: '-20px',
    width: '110%',
    height: '100px',
    opacity: 0,
    borderBottom: '1px solid #666',
    background: '#333',
    boxShadow: '5px 5px 8px #000',
    overflow: 'hidden',
    zIndex: '9',
    WebkitTransition: 'all .4s ease-in-out',
    MozTransition: 'all .4s ease-in-out',
    OTransition: 'all .4s ease-in-out',
    transition: 'all .4s ease-in-out'
  },
  bgPin: {
    WebkitTransform: 'translateY(120px)',
    MsTransform: 'translateY(120px)',
    transform: 'translateY(120px)',
    opacity: 1
  },
  container: {
    position: 'relative',
    background: 'none',
    overflow: 'auto',
    zIndex: '11',
    fontFamily: 'Helvetica Neue, Avenir Next, Arial, sans-serif',
    fontSize: '0.875rem',
    color: c.white,
    width: '100%'
  },
  logoArea: {
    float: 'left'
  },
  navArea: {
    width: '12rem',
    float: 'left',
    lineHeight: '1.4rem',
    marginLeft: '0.8rem'
  },
  logo: {
    fontSize: '2.8rem',
    textShadow: '1px 1px 2px #0a0a0a',
    fontWeight: '100',
    padding: '10px 24px 10px 0',
    lineHeight: '4rem',
    color: c.white,
    borderRight: '1px solid',
    borderColor: c.lightGrey
  },
  logoImg: {
    height: '18px',
    width: '150px',
    margin: '26px 20px',
  },
  navigation: {
    flex: '1',
    display: 'flex',
    margin: '0 10px',
    alignItems: 'center',
  },
  navItem: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    textShadow: '1px 1px 2px #0a0a0a',
    display: 'block',
    margin: '0 10px',
    ':visited': {
      color: c.white
    },
    ':link': {
      color: c.white
    },
    ':hover': {
      color: c.white,
      fontWeight: 'bold'
    },
  },
  phoneButtonArea: {
    textAlign: 'right',
    marginTop: '0.2rem'
  },
  buttonArea: {
    float: 'right',
    display: 'inline-block'
  },
  phoneArea: {
    float: 'right',
    display: 'inline-block',
    width: '14rem',
    marginRight: '1.4rem'
  },
  callInfo: {
    float: 'right',
    width: '10rem',
    marginTop: '0.4rem',
    textShadow: '1px 1px 2px #0a0a0a',
  },
  callNumber: {
    color: c.white,
    fontSize: '1.6rem',
    lineHeight: '1.6rem',
    textAlign: 'right',
  },
  callText: {
    fontSize: '0.750rem',
    textAlign: 'right',
    textTransform: 'uppercase',
  },
  phoneIconWrapper: {
    float: 'right',
    marginRight: '1rem',
    marginTop: '0.6rem',
    width: '2.6rem',
  },
  phoneIcon: {
    width: '2.2rem',
    color: 'red',
    fill: 'red',
    height: '2.2rem',
  },
  pilotSignup: {
    display: 'flex',
    backgroundColor: c.white,
    color: c.blue,
    borderLeft: '1px solid',
    borderColor: c.lightGrey,
    alignItems: 'center',
  },
  pilotSignupButton: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    height: '70px',
  },
  login: {
    display: 'flex',
    backgroundColor: c.blue,
    textDecoration: 'none',
    alignItems: 'center',
    ':visited': {
      color: c.white
    },
    ':link': {
      color: c.white
    },
  },
  loginButton: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    color: c.white,
    display: 'flex',
    minWidth: '0',
    height: '70px',
  },
  privateIcons: {
    marginRight: '0',
    marginLeft: '0',
  },
  iconMarginRight: {
    marginRight: '0px',
    [ss.lg]: {
      marginRight: '8px',
    }
  }

})

export default header
