import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const header = StyleSheet.create({
  marginTopBottom: {
    margin: '1rem 0',

    // [ss.lg]: {
    //   marginRight: '8px',
    // }
  },
  paddingTopBottom: {
    padding: '1rem 1.5rem',
  },
  logo: {
    width: '12rem',
  },
  icon_only: {
    marginRight: '0',
  },
  icon_with_text: {
    'marginLeft': '0.5rem'
  },
})

export default header
