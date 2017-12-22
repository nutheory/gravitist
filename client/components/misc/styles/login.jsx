import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const login = StyleSheet.create({
  innerContainer: {
    width: '30rem',
    maxWidth: '90%',
  },
  logo: {
    fontSize: '2.8rem',
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    textShadow: '1px 1px 2px #0a0a0a',
    fontWeight: '100',
    padding: '4px 24px 10px 0',
    lineHeight: '3rem',
    color: c.white
  },
  formArea: {
    borderRadius: '4px',
    backgroundColor: 'rgba(255,255,255, 0.4)',
    padding: '2rem',
    boxShadow: '1px 1px 2px #0a0a0a',
  },
  button: {
    background: '#AA076B',
    background: '-webkit-linear-gradient(to bottom, #AA076B, #61045F)',
    background: 'linear-gradient(to bottom, #AA076B, #61045F)',
    color: '#fff'
  }
})

export default login
