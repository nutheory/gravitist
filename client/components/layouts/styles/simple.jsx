import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const simple = StyleSheet.create({
  container: {
    background: '#085078',
    background: '-webkit-linear-gradient(to top, #085078, #85d8ce)',
    background: 'linear-gradient(to top, #085078, #85d8ce)',
    display: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    padding: '2rem',
    height: '100vh',
    overflow: 'auto'
  },
})

export default simple
