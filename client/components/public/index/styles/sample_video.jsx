// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const sampleVideo = StyleSheet.create({
  container: {
    width: '100%',
  },
  video: {
    width: '100%',
  },
  staticImage: {
    backgroundPosition: 'center center',
    display: 'block',
    backgroundSize: 'cover',
    width: '100%',
    ':hover': {
      cursor: 'pointer',
    },
    [ss.sm]: {
      height: '360px',
    },
    [ss.md]: {
      height: '400px',
    },
    [ss.lg]: {
      height: '500px',
    },
  }
})

export default sampleVideo
