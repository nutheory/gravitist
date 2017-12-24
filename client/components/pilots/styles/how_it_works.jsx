import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const howItWorks = StyleSheet.create({
  bulletListText: {
    marginLeft: '6rem',
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '1rem',
    lineHeight: '1.2rem',
    textShadow: 'none',
    fontWeight: '100'
  },
  button: {
    position: 'relative',
    width: '60%',
    margin: '2rem auto'
  },
  name: {
    color: '#999',
    fontSize: '1rem',
    lineHeight: '1.4rem',
    float: 'left',
    width: '50%',
    [ss.sm]: {
      textAlign: 'center',
    },
  },
  location: {
    color: '#999',
    fontSize: '1rem',
    lineHeight: '1.4rem',
    float: 'left',
    width: '50%',
    textAlign: 'right',
    [ss.sm]: {
      textAlign: 'center',
    },
  },
  qoute: {
    fontSize: '1rem',
    color: '#4a4a4a',
    lineHeight: '1.4rem',
    marginBottom: '0.4rem',
    [ss.sm]: {
      textAlign: 'center',
    },
  }
})

export default howItWorks
