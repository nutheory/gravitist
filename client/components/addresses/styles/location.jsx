import { StyleSheet } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const workArea = StyleSheet.create({
  posForSpinner: {
    position: 'relative'
  },
  spinner: {
    position: 'absolute',
    top: '6px',
    right: '2px',
    color: c.bFgBlue,
    opacity: '0',
    transition: 'opacity 0.6s ease-in'
  },
  spinnerShow: {
    opacity: '1'
  },
  textBottomMargin: {
    marginBottom: '2rem'
  },
  buttonSuccessText: {
    color: c.green,
    textShadow: '1px 1px 1px #666'
  },
  button: {
    display:'flex',
    height: '98%',
    alignSelf: 'center',
    color: c.white,
    boxShadow: b.shadow,
    borderRadius: b.radius,
    border: '0',
    backgroundImage: 'linear-gradient(to top, #209cee, #72c0f3)',
    ':hover': {
      backgroundImage: 'linear-gradient(to top, #1979b9, #72c0f3)'
    },
    ':active': {
      boxShadow: 'none',
    }
  },
  fixDropdownItemLinks: {
    textDecoration: 'none',
    color: '#4a4a4a'
  }
})

export default workArea
