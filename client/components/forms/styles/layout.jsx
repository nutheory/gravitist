import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../../../styles/cssFunc'

const layout = StyleSheet.create({
  container: {
    width: '640px',
    margin: 'auto',
  },
  fieldPadding: {
    padding: '0'
  },
  fieldRow: {
    width: '100%',
    display: 'flex',
  },
  multiColumnEvenSize: {
    flex: '1',
    margin: '0 1em',
  },

})

export default layout
