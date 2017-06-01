import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const photos = StyleSheet.create({
  container: {
    width: '100%',
    [scrSize.small]: {
      height: '440px',
    },
    [scrSize.medium]: {
      height: '600px',
    },
    [scrSize.large]: {
      display: 'flex',
      height: '400px',
    },
  },
  photo: {
    overflow: 'hidden',
    [scrSize.small]: {
    },
    [scrSize.medium]: {
    },
    [scrSize.large]: {
      flex: '1',
      width: 'calc(33.3333% - 1rem)',
      height: '400px',
      margin: '0 2px',
    },
  },
  photoImg: {
    width: '100%',
    height: '400px',
    [scrSize.small]: {
      height: '400px',
    },
    [scrSize.medium]: {
      height: '560px',
    },
    [scrSize.large]: {
      height: '500px',
    },
  }
})

export default photos
