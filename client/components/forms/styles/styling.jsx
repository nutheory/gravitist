import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../../../styles/cssFunc'

const styling = StyleSheet.create({
  sectionTitle: {
    marginLeft: '1em',
    marginRight: '1em',
    marginBottom: '0'
  },
  textfieldFullSize: {
    width: '100%',
  },
  contactSplitSection: {
    display: 'flex'
  },
  contactContent: {
    flex: '1'
  },
  contactAdd: {
    flex: '0',
    marginLeft: '20px',
    alignSelf: 'flex-end',
    paddingBottom: '10px',
  },
  addressSplitSection: {
    display: 'flex',
  },
  addressState: {
    flex: '0',
  },
  addressSelect: {
    maxWidth: '120px'
  },
  addressZip: {
    flex: '3',
    marginLeft: '20px',
  }
})

export default styling
