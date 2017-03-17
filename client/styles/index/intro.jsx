import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../cssUtils'

const intro = StyleSheet.create({
  introContainer: {
    position:'relative',
    minWidth: '100%',
    backgroundColor: '#fff',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    opacity: '0.3',
    height: 'auto',
    zIndex: '5',
    transform: 'translateX(-50%) translateY(-50%)',
    backgroundSize: 'cover',
  },
  container: {
    position:'fixed',
    zIndex: '10',
    width: '50%',
    textAlign: 'center',
    top: '20%',
    margin: 'auto',
  },
  title:{
    color: '#5CC9FF',
    fontSize: '3em',
    textShadow: '2px 2px #666',
  },
  text: {
    fontSize: '1.8em',
    color: '#666',
    textShadow: '2px 2px #e5e5e5',
  },
  input: {
    fontSize: '1.4em',
    width: '100%',
    height: '80px',
    marginBottom:20,
    color: '#5CC9FF',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  returning: {
    width: '45%',
  },
  getStarted: {
    width: '45%',
  },

  // screenSize.[smartphone, smartphoneLandscape, tablet, desktop]
  // [screenSize.smartphone]: {
  //   container: {'!important',
  // },
  // [screenSize.smartphoneLandscape]: {
  //   container: {
  //     position:'relative',
  // },
})

export default intro
