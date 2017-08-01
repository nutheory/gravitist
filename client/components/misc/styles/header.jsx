import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const Header = StyleSheet.create({
  container: {
    width: '70%',
    margin: 'auto',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'poppins-bold',
    textTransform: 'uppercase',
    padding: '0',
    margin: '0',
    [ss.sm]: {
      fontSize: '1.4rem',
      lineHeight: '2rem'
    },
    [ss.md]: {
      fontSize: '2rem',
      lineHeight: '2.6rem'
    }
  },
  subtitle: {
    fontFamily: 'poppins-semibold',
    padding: '0',
    margin: '0',
    [ss.sm]: {
      fontSize: '1.2rem',
      lineHeight: '1.6rem'
    },
    [ss.md]: {
      fontSize: '1.4rem',
      lineHeight: '1.8rem'
    }
  },
  text: {
    fontFamily: 'poppins-regular',
    padding: '0',
    margin: '0',
    [ss.sm]: {
      fontSize: '0.875rem',
      lineHeight: '1.2rem'
    },
    [ss.md]: {
      fontSize: '1rem',
      lineHeight: '1.4rem'
    },
  }
})

export default Header
