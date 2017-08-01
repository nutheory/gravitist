import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const photos = StyleSheet.create({
  container: {
    width: '100%',
    [ss.sm]: {
      height: '440px',
    },
    [ss.md]: {
      height: '600px',
    },
    [ss.lg]: {
      display: 'flex',
      height: '400px',
    },
  },
  photo: {
    overflow: 'hidden',
    [ss.sm]: {
    },
    [ss.md]: {
    },
    [ss.lg]: {
      flex: '1',
      width: 'calc(33.3333% - 1rem)',
      height: '400px',
      margin: '0 2px',
    },
  },
  photoImg: {
    width: '100%',
    height: '400px',
    [ss.sm]: {
      height: '400px',
    },
    [ss.md]: {
      height: '560px',
    },
    [ss.lg]: {
      height: '500px',
    },
  }
})

export default photos
