import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const hero = StyleSheet.create({
  container: {
    display: 'block',
    height: '95vh',
    position: 'relative',
  },
  bg: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    height: '95vh',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    [scrSize.desktop]: {
      backgroundPosition: 'center center',
    },
    [scrSize.smartphone]: {
      backgroundPosition: 'center center',
    }
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    background: '#16222a',
    background: '-webkit-linear-gradient(to bottom, #16222a, #3a6073)',
    background: 'linear-gradient(to bottom, #16222a, #3a6073)',
    opacity: '0.7',
  },
  synopsis: {
    fontFamily: 'poppins-bold',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: Colors.white,
    textTransform: 'uppercase',
    position: 'relative',
    textAlign: 'center',
    zIndex: '10',
    textShadow: '1px 1px 2px #0a0a0a',
    [scrSize.desktop]: {
      width: '75%',
      fontSize: '3.5rem',
    },
    [scrSize.smartphone]: {
      width: '90%',
      fontSize: '1.6rem',
    }
  },
  bulletPoints: {
    display: 'flex',
    fontFamily: 'poppins-semibold',
    color: Colors.white,
    position: 'relative',
    flexWrap: 'wrap',
    zIndex: '10',
    fontSize: '1.5rem',
    textShadow: '1px 1px 2px #0a0a0a',
    [scrSize.desktop]: {
      fontSize: '1.5rem',
      justifyContent: 'center',
    },
    [scrSize.smartphone]: {
      marginLeft: '10px',
      fontSize: '1rem',
      justifyContent: 'left',
    }
  },
  point: {
    margin: '10px 40px',
  },
  playIcon: {
    width: '22px',
    height: '22px',
    display: 'inline-block',
    marginRight: '10px',
  },
  scrollDown: {
    position: 'absolute',
    maxWidth: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    [scrSize.desktop]: {
      bottom: '40px',
    },
    [scrSize.smartphone]: {
      bottom: '20px',
    }
  },
  scrollDownInner:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    opacity: '0.7',
    ':hover': {
       opacity: '1'
    }
  },
  scrollDownIcon: {
    width: '26px',
    height: '26px',
  },
  scrollDownText: {
    display: 'inline-block',
    marginTop: '10px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#fff',
  },
})

export default hero
