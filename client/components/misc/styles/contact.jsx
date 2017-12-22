import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const contact = StyleSheet.create({
  contactSplitSection: {
    display: 'flex'
  },
  contactContent: {
    flex: '2 0 300px'
  },
  contactButtonArea: {
    flexGrow: 0,
    display: 'flex'
  },
  contactButton: {
    color: '#fff',
  },
  contactButtonMinus: {
    marginRight: '0.75rem'
  },
  contactDropdown: {
    width: '30rem',
    overflow: 'auto'
  },
  contactDropdownItem: {
    width: '10rem',
    float: 'left',
    padding: '0.25rem 0.75rem',
    display: 'block'
  },
  removeButton: {
    backgroundColor: 'rgba(212,0,88,1)'
  },
})

export default contact
