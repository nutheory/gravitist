import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const hero = StyleSheet.create({
  synopsis: {
    fontFamily: 'poppins-bold',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: colors.white,
    textTransform: 'uppercase',
    position: 'relative',
    textAlign: 'center',
    zIndex: '10',
    textShadow: '1px 1px 2px #0a0a0a',
    [scrSize.large]: {
      width: '75%',
      fontSize: '3.5rem',
    },
    [scrSize.medium]: {
      width: '75%',
      fontSize: '3.5rem',
    },
    [scrSize.small]: {
      width: '90%',
      fontSize: '1.6rem',
    }
  },
  bulletPoints: {
    display: 'flex',
    fontFamily: 'poppins-semibold',
    color: colors.white,
    position: 'relative',
    flexWrap: 'wrap',
    zIndex: '10',
    fontSize: '1.5rem',
    justifyContent: 'center',
    textShadow: '1px 1px 2px #0a0a0a',
    [scrSize.large]: {
      fontSize: '1.5rem',
    },
    [scrSize.small]: {
      fontSize: '1rem',
      paddingLeft: '10px'
    }
  },
  point: {
    margin: '10px 40px',
    flexWrap: 'nowrap',
    [scrSize.small]: {

    }
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
    left: '50%',
    marginLeft: '-90px',
    [scrSize.small]: {
      bottom: '20px',
    },
    [scrSize.medium]: {
      bottom: '30px',
    },
    [scrSize.large]: {
      bottom: '40px',
    },
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
