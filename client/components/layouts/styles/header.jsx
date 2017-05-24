import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../styles/cssFunc'
import Colors from '../../../styles/colors'

const header = StyleSheet.create({
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    background: Colors.white,
    fontFamily: 'poppins-semibold',
    fontSize: '0.875rem',
    color: Colors.black,
    width: '100%',
    height: '70px',
    display: 'flex',
    boxShadow: '1px 1px 6px #0a0a0a',
  },
  logo: {
    borderRight: '1px solid',
    borderColor: Colors.lightGrey
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
      color: Colors.black
    },
    ':link': {
      color: Colors.black
    },
    ':hover': {
      color: Colors.blue
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
    color: Colors.blue,
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
    backgroundColor: Colors.white,
    color: Colors.blue,
    borderLeft: '1px solid',
    borderColor: Colors.lightGrey,
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
    backgroundColor: Colors.blue,
    textDecoration: 'none',
    alignItems: 'center',
    ':visited': {
      color: Colors.white
    },
    ':link': {
      color: Colors.white
    },
  },
  loginButton: {
    fontFamily: 'poppins-semibold',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    color: Colors.white,
    display: 'flex',
    height: '70px',
  }
})

export default header
