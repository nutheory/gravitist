import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

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
    [scrSize.desktop]: {
      height: '600px',
    },
    [scrSize.smartphone]: {
      // width: '100%',
      height: '360px',
    }
  }
})

export default sampleVideo
