import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const photos = StyleSheet.create({
  container: {
    display: 'flex',
    [ss.sm]: {
      flexWrap: 'wrap'
    }
  },
  message: {
    position: 'relative',
    margin: '2rem',
    width: '50%'
  },
  messageBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '6px',
    background: '#000',
    opacity: '0.6',
    zIndex: '2'
  },
  messageText: {
    position: 'relative',
     padding: '1.4rem',
     zIndex: '3'
  },
  header: {
    color: c.white,
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    fontSize: '2.4rem'
  },
  text: {
    color: c.white,
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    fontSize: '1.6rem'
  },
  mainPhoto: {
    backgroundSize: 'cover',
    [ss.sm]: {
      width: '100%',
      height: '340px',
    },
    [ss.md]: {
      flex: '1',
      height: '440px',
    }
  }
})

export default photos
