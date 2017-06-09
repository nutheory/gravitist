import { StyleSheet, css } from 'aphrodite'
import { ss, c } from './helpers'

const commonForms = StyleSheet.create({
  container: {
    paddingBottom: '2rem'
  },
  subtitle: {
    fontFamily: 'poppins-light',
    fontSize: '1.2rem',
    color: c.grey,
    marginBottom: '0px',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  area: {
    ':first-child': {
      [ss.sm]: {
        width: '100%'
      },
      [ss.md]: {
        width: 'calc(50% - 2rem)',
        marginRight: '2rem',
      },
    },
    ':last-child': {
      [ss.sm]: {
        width: '100%'
      },
      [ss.md]: {
        width: 'calc(50% - 2rem)',
        marginLeft: '2rem',
      },
    }
  },

  element: {
    fontFamily: 'poppins-regular',
    fontSize: '1rem',
    width: '100%'
  }
})

export default commonForms
