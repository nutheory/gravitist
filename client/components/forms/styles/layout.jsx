import { StyleSheet, css } from 'aphrodite'
import { ss } from '../../../styles/helpers'

const layout = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
  },
  fieldPadding: {
    padding: '0'
  },
  fieldRow: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  multiColumnEvenSize: {
    flex: '1',
    flexWrap: 'wrap',
    margin: '0 1em',
  },
  singleColumn: {
    margin: '0 1em'
  }

})

export default layout
