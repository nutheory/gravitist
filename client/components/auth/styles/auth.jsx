import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../../../styles/cssFunc'

const login = StyleSheet.create({
  container: {
    padding:'0 20px',
    maxWidth: '60%',
    border: '1px solid #333',
    borderRadius: '3px',
    backgroundColor: '#fff',
    boxShadow: '3px 3px 3px'
  },
  pricing: {
    position: 'relative',
    left:'10%',
  },
  tombs: {
    border: '1px solid #333',
    borderRadius: '3px',

  },
  selectedTomb: {
    boxShadow: '3px 3px 3px'
  },
})

export default login
