import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const contact = StyleSheet.create({
  contactSplitSection: {
    display: 'flex'
  },
  contactContent: {
    flex: '1'
  },
  contactButton: {
    flex: '0',
    textAlign: 'right',
  },
  removeButton: {
    backgroundColor: 'rgba(212,0,88,1)'
  },
})

export default contact
