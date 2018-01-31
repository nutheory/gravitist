import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const dashboard = StyleSheet.create({
  paddingTopBottom: {
    padding: '1rem 1.5rem',
  },
  infoAlert: {
    background: '#f6fef9',
    border: '1px solid #23d160',
    padding: '1em 1.25em',
    borderRadius: '3px',
    marginBottom: '1.5em'
  },
  slideClose: {
    maxHeight: '0',
    WebkitTransition: 'all .4s ease-in-out',
    MozTransition: 'all .4s ease-in-out',
    OTransition: 'all .4s ease-in-out',
    transition: 'all .4s ease-in-out'
  }
})

export default dashboard
