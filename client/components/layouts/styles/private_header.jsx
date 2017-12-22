import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const header = StyleSheet.create({
  marginTopBottom: {
    margin: '0.2rem 0',
    display: 'block'
  },
  paddingTopBottom: {
    paddingBottom: '2rem',
  },
  logo: {
    padding: '1rem',
    textTransform: 'uppercase',
    color: '#666',
    fontSize: '2.4rem',
    fontWeight: '100',
    textAlign: 'center'
  },
  icon_only: {
    marginRight: '0',
  },
  icon_with_text: {
    'marginLeft': '0.5rem'
  },
})

export default header
