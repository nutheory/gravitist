import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const birdsEyeView = StyleSheet.create({
  synopsis: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    margin: '0',
    display: 'flex',
    alignItems: 'right',
    flexDirection: 'column',
    color: c.white,
    position: 'relative',
    textAlign: 'right',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    [ss.sm]: {
      width: '90%',
      fontSize: '1.6rem',
    },
    [ss.lg]: {
      fontSize: '3.6rem',
      lineHeight: '4.4rem'
    },
  },
  infoText: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    color: c.white,
    fontSize: '2.4rem',
    fontWeight: '200',
    textShadow: '2px 2px 2px #000',
    lineHeight: '3rem',
    [ss.sm]: {
      width: '100%',
    },
    [ss.lg]: {
      width: '100%',
    },
  },
  container: {
    position: 'relative',
    background: `url(${require('../../../assets/images/phone.jpg')})`,
    backgroundSize: 'cover',
    height: '900px',
    backgroundPosition: 'center center',
  },
  sectionHeader: {
    [ss.md]: {
      textAlign: 'left'
    },
  },
  drone: {
    background: `url(${require('../../../assets/images/drone@2x.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-60px 10px',
    [ss.sm]: {
      display: 'none'
    },
    [ss.md]: {
      backgroundSize: '100%',
      flex: '5',
    },
    [ss.lg]: {
      flex: '5',
      backgroundSize: '110%',
    },
  },
  info: {
    [ss.sm]: {
      textAlign: 'center',
      width: '100%',
      flex: '5',
    },
    [ss.md]: {
      margin: '3rem',
      flex: '5',
    },
    [ss.lg]: {
      flex: '6',
    },
  },
  infoWrapper: {
    [ss.sm]: {
      margin: '0 2rem',
      display: 'flex',
      flexDirection: 'column',
      width: 'calc(100% - 4rem)',
    },
    [ss.md]: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
    },
    [ss.lg]: {
      position: 'absolute',
      bottom: '3rem',
      width: '45%',
      marginLeft: '35%'
    },
  },
  ctaButtons: {
    width: '100%',
    marginTop: '2rem',
  },
  ctaButtonRight: {
    display: 'inline-block',
    width: '20rem',
  },
  ctaButtonLeft: {
      display: 'inline-block',
    width: '20rem',
    marginRight: '40px'
  }
})

export default birdsEyeView
