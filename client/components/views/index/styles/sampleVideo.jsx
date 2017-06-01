import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const sampleVideo = StyleSheet.create({
  container: {
    width: '100%',
  },
  video: {
    width: '100%',
  },
  staticImage: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: '100%',
    ':hover': {
      cursor: 'pointer',
    },
    [scrSize.small]: {
      height: '360px',
    },
    [scrSize.medium]: {
      height: '400px',
    },
    [scrSize.large]: {
      height: '500px',
    },
  }
})

export default sampleVideo
