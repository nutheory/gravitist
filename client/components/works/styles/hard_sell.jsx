import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const hardSell = StyleSheet.create({
  container: {
    background: '#c04848',
    background: '-webkit-linear-gradient(to top, #c04848, #480048)',
    background: 'linear-gradient(to top, #c04848, #480048)'
  },
  wrapper: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    maxWidth: '1280px',
    margin: '3rem auto',
    display: 'flex',
    color: '#FFF'
  },
  dronePic: {
    width: '50%',
    flex: '1',
  },
  image: {
    width: '100%'
  },
  salesCopy: {
    flex: '1',
    fontSize: '1.4rem',
    marginTop: '2rem'
  },
  boldCopy: {
    fontWeight: 'bolder',
    width: '80%',
    margin: '3rem auto'
  },
  normalCopy: {
    width: '80%',
    margin: '3rem auto'
  },
  button: {
    position: 'relative',
    width: '80%',
    fontSize: '1.0rem',
    margin: '2rem auto'
  },
})

export default hardSell
