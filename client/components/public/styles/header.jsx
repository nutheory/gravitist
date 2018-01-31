import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const Header = StyleSheet.create({
  container: {
    width: '100%',
    margin: '0 auto 4rem 0',
    textAlign: 'left',
  },
  title: {
    fontFamily: 'Helvetica Neue, Avenir Next, Arial, sans-serif',
    textTransform: 'uppercase',
    fontWeight: '200',
    padding: '0',
    margin: '0',
    color: c.grey,
    [ss.sm]: {
      fontSize: '1.4rem',
      lineHeight: '2rem'
    },
    [ss.md]: {
      fontSize: '2.4rem',
      lineHeight: '3rem'
    }
  },
  subtitle: {
    fontFamily: 'Helvetica Neue, Avenir Next, Arial, sans-serif',
    fontWeight: '200',
    padding: '0',
    margin: '0',
    color: c.grey,
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
