import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const header = StyleSheet.create({
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    background: c.white,
    fontFamily: 'poppins-semibold',
    fontSize: '0.875rem',
    color: c.black,
    width: '100%',
    height: '70px',
    display: 'flex',
    boxShadow: '1px 1px 6px #0a0a0a',
  },
  logo: {
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
    display: 'block',
    margin: '0 10px',
    ':visited': {
      color: c.black
    },
    ':link': {
      color: c.black
    },
    ':hover': {
      color: c.blue
    },
  },
  callInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  callInfoInner: {
    padding: '0 20px',
  },
  callNumber: {
    color: c.blue,
    fontSize: '1.250rem',
    display: 'flex',
    textAlign: 'right',
    alignItems: 'center',
  },
  callText: {
    fontSize: '0.750rem',
    textAlign: 'right',
    display: 'block',
    textTransform: 'uppercase',
  },
  phoneIcon: {
    display: 'inline-block',
    marginRight: '10px',
    width: '24px',
    height: '24px',
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
    fontFamily: 'poppins-semibold',
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
    fontFamily: 'poppins-semibold',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    color: c.white,
    display: 'flex',
    height: '70px',
  }
})

export default header
