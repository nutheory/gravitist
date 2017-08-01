import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'
import drone from '../../../assets/images/drone@2x.png'

const birdsEyeView = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  sectionHeader: {
    [ss.md]: {
      textAlign: 'left'
    },
  },
  drone: {
    background: `url(/${drone})`,
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
    },
  },
  infoText: {
    fontFamily: 'poppins-light',
    fontSize: '1.375rem',
    opacity: '0.8',
    lineHeight: '2.4rem',
    [ss.sm]: {
      width: '100%',
    },
    [ss.lg]: {
      width: '75%',
    },
  },
  worksWith: {
    [ss.sm]: {
      marginTop: '2rem',
      marginBottom: '2rem'
    },
    [ss.sm]: {
      marginTop: '3rem',
      marginBottom: '3rem'
    },

    [ss.lg]: {
      marginTop: '4rem',
      marginBottom: '4rem'
    },
  },
  worksWithHeader: {
    fontFamily: 'poppins-bold',
    textTransform: 'uppercase',
  },
  worksWithLogos: {
    display: 'flex',
    alignItems: 'center',
    [ss.sm]: {
      flexWrap: 'wrap',
      textAlign:'center',
      justifyContent: 'center',
    },
    [ss.md]: {
      flexWrap: 'wrap',
    },
    [ss.lg]: {
    },
  },
  logo: {
    backgroundPosition: 'center center',
    [ss.sm]: {
      marginRight: '1.2rem',
      marginBottom: '1.5rem',
    },
    [ss.md]: {
      marginRight: '1.2rem',
      marginBottom: '1.5rem',
    },
    [ss.lg]: {
      marginRight: '1.4rem',
    },
    ':last-child': {
      marginRight: '0'
    }
  }
})

export default birdsEyeView
