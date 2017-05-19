import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const aerialImagerySells = StyleSheet.create({
  container: {
    clear: 'both',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottom: `1px solid ${Colors.blue}`,
    background: 'linear-gradient(top, rgba(192, 192, 170, 0.1), rgba(28, 239, 255, 0.1))',
  },
  sellingPointList: {
    display: 'flex',
    margin: '40px auto 0 auto',
    [scrSize.desktop]: {
      width: '70%',
    },
    [scrSize.smartphone]: {
      // width: '90%',
    }
  },
  sellingPoint: {
    width: 'calc(20% - 2rem)',
    margin: '0 1rem',
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    borderRadius: '4px',
    borderTop: `3px solid ${Colors.blue}`,
  },
  pointImgWrapper: {
    width: '64px',
    margin: '0px auto 20px auto',
  },
  pointText: {
    textAlign:'center',
    fontSize: '0.875rem'
  }
})

export default aerialImagerySells
