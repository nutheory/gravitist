import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../styles/helpers'

const intro = StyleSheet.create({
  introContainer: {
    position:'relative',
    minWidth: '100%',
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
    height: 'auto',
    zIndex: '1',
    transform: 'translateX(-50%) translateY(-50%)',
    backgroundSize: 'cover',
  },
  downArrow: {

  },
  container: {
    position:'fixed',
    backgroundColor: '#FFF',
    boxShadow: '3px 3px 3px',
    zIndex: '100',
    width: '30%',
    padding: '20px',
    top: '20%',
    left:'10%',
    border: '1px solid #000',
  },
  title:{
    color: '#666',
    fontSize: '1.6em',
  },
  text: {
    marginBottom: '20px',
    fontSize: '1.0em',
    color: '#333',
  },
  buttons: {
    display: 'flex',
  },
  getStarted: {
    width: '35%',
    fontSize: '1.2em',
    border: '1px solid #64DD17',
    textAlign: 'center',
    color: '#64DD17',
    padding: '10px 20px',
    textDecoration: 'none',
    ':hover': {
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: '#64DD17'
    }
  },

  // screenSize.[smartphone, smartphoneLandscape, tablet, desktop]
  // [screenSize.smartphone]: {
  //   container: {'!constant',
  // },
  // [screenSize.smartphoneLandscape]: {
  //   container: {
  //     position:'relative',
  // },
})

export default intro
