import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../cssUtils'

const intro = StyleSheet.create({
  introContainer: {
    position:'relative',
    minWidth: '100%',
    background: 'teal',
    minHeight: '100%',
  },
  video: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    opacity: '0.7',
    height: 'auto',
    zIndex: '5',
    transform: 'translateX(-50%) translateY(-50%)',
    backgroundSize: 'cover',
  },
  titleContainer: {
    position:'fixed',
    zIndex: '10',
    height: 400,
    width: 478,
    top: 100,
    left: 40,
  },
  title: {
    position:'relative',
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
  },
  machine: {
    position:'absolute',
    top: '-245px',
    right: '-80px',
  },
  machineResize: {
    width: '160%',
  },
  // screenSize.[smartphone, smartphoneLandscape, tablet, desktop]

})

export default intro
