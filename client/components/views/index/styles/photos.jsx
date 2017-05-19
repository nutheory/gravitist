import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const photos = StyleSheet.create({
  container: {
    overflow: 'hidden',
    display: 'flex',
  },
  photo: {
    flex: '1',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: '33%',
    height: '600px',
    margin: '0 2px',
  }
})

export default photos
