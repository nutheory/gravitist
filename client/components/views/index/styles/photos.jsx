import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const photos = StyleSheet.create({
  container: {
    [scrSize.desktop]: {
      display: 'flex',
      width: '100%',
      height: '540px',
    },
    [scrSize.smartphone]: {
      width: '100%',
      height: '440px',
    }
  },
  photo: {
    [scrSize.desktop]: {
      flex: '1',
      width: 'calc(33% - 8px)',
      height: '540px',
      margin: '0 2px',
    },
    [scrSize.smartphone]: {
      // width: '100%',
      height: '400px',
    }
  },
  photoImg: {
    [scrSize.desktop]: {
      width: '100%',
      height: '540px',
    },
    [scrSize.smartphone]: {
      width: '100%',
      height: '400px',
    }
  }
})

export default photos
