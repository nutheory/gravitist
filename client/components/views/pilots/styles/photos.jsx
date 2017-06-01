import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const photos = StyleSheet.create({
  container: {
    display: 'flex',
    [scrSize.small]: {
      flexWrap: 'wrap'
    }
  },
  mainPhoto: {
    backgroundSize: 'cover',
    [scrSize.small]: {
      width: '100%',
      height: '340px',
    },
    [scrSize.medium]: {
      flex: '1',
      height: '440px',
    }
  }
})

export default photos
