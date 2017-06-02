import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const intro = StyleSheet.create({
  container: {
    background: c.blue,
    color: c.white,
    width: '100%',
    margin: 'auto',
  },
  innerContainer: {
    maxWidth: '1280px',
    display: 'flex',
  },
  markingCopy: {
    flex: '1',
  },
  header: {
    fontFamily: 'poppins-bold',
    fontSize: '3rem',
  },
  marketingPhotos: {
    flex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  photoWrapper: {
    width: '50%',
    height: '300px'
  },
  photo: {
    width: '100%',
    height: '100%',
  }
})

export default intro
