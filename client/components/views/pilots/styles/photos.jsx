import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const photos = StyleSheet.create({
  container: {
    display: 'flex',
    [ss.sm]: {
      flexWrap: 'wrap'
    }
  },
  mainPhoto: {
    backgroundSize: 'cover',
    [ss.sm]: {
      width: '100%',
      height: '340px',
    },
    [ss.md]: {
      flex: '1',
      height: '440px',
    }
  }
})

export default photos
