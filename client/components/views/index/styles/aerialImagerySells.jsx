import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const aerialImagerySells = StyleSheet.create({
  container: {
    clear: 'both',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottom: `1px solid ${Colors.blue}`,
    background: 'linear-gradient(top, rgba(192, 192, 170, 0.1), rgba(28, 239, 255, 0.1))',
  },
  sellingPointList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '40px auto 0 auto',
    justifyContent: 'space-between',
    [scrSize.desktop]: {
      width: '80%',
    },
    [scrSize.smartphoneLandscape]: {
      width: '80%',
    },
    [scrSize.tablet]: {
      width: '80%',
    },
    [scrSize.smartphone]: {
      // width: '90%',
    }
  },
  sellingPoint: {
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    borderRadius: '4px',
    borderTop: `3px solid ${Colors.blue}`,
    [scrSize.desktop]: {
      width: 'calc(20% - 4.2rem)',
      margin: '0 1rem',
    },
    [scrSize.smartphoneLandscape]: {
      width: 'calc(40% - 3.4rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [scrSize.tablet]: {
      width: 'calc(40% - 3.4rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [scrSize.smartphone]: {
      // width: 'calc(20% - 2rem)',
      margin: '1rem 3rem',
    }
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
