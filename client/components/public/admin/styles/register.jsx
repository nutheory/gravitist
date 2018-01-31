// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../../styles/helpers'

const register = StyleSheet.create({
  container: {
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: 'rgba(255,255,255,1)',
    boxShadow: '2px 2px 8px #000',
    maxWidth: '60rem',
    margin: '2rem auto',
    [ss.desktop]: {
      width: '70%',
    },
    [ss.smartphone]: {

    }
  },
  section: {
    margin: '2rem'
  },
})

export default register
