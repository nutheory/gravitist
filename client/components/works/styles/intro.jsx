import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const intro = StyleSheet.create({
  container: {
    background: c.blue,
    color: c.white,
    width: '100%',
    margin: 'auto',
  },
  innerContainer: {
    maxWidth: '1280px',
    margin: 'auto',
    alignItems: 'center',
    display: 'flex',
  },
  marketingCopy: {
    flex: '1',
    alignItems: 'center',
    width: '80%',
  },
  header: {
    fontFamily: 'poppins-bold',
    fontSize: '3rem',
    width: '80%',
    margin: '0 1.2rem',
  },
  copy: {
    fontFamily: 'poppins-light',
    fontSize: '1.2rem',
    width: '80%',
    lineHeight: '1.8rem',
    margin: '1.2rem',
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
  playIcon: {
    width: '22px',
    height: '22px',
    display: 'inline-block',
    marginRight: '10px',
  },
  photo: {
    width: '100%',
    height: '100%',
  }
})

export default intro
