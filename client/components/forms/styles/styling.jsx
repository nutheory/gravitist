import { StyleSheet, css } from 'aphrodite'
import { ss } from '../../../styles/helpers'

const styling = StyleSheet.create({
  sectionTitle: {
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
  contactButton: {
    flex: '0',
    marginLeft: '20px',
    alignSelf: 'flex-end',
    paddingBottom: '10px',
  },
  removeButton: {
    backgroundColor: 'rgba(212,0,88,1)'
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
  },
  addressAutocompleteForm: {
    display: 'flex',
    width: '100%',
    marginLeft: '1em',
    marginRight: '1em',
  },
  addressAutocomplete: {

    flexGrow: '8',
    marginLeft: '1em',
    marginRight: '1em',
  },
  addressAutocompleteSubmit: {
    flexGrow: '1',
    marginLeft: '1em',
    marginRight: '1em',
  },
  mapContainer: {
    width: '100%',
    height: '360px',
    marginLeft: '1em',
    marginRight: '1em',
  },

})

export default styling
