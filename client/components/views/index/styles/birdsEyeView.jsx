import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'
import drone from '../../../../assets/images/drone@2x.png'

const birdsEyeView = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  sectionHeader: {
    [scrSize.medium]: {
      textAlign: 'left'
    },
  },
  drone: {
    background: `url(/${drone})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-60px 10px',
    [scrSize.small]: {
      display: 'none'
    },
    [scrSize.medium]: {
      backgroundSize: '100%',
      flex: '5',
    },
    [scrSize.large]: {
      flex: '5',
      backgroundSize: '110%',
    },
  },
  info: {
    [scrSize.small]: {
      textAlign: 'center',
      width: '100%',
      flex: '5',
    },
    [scrSize.medium]: {
      margin: '3rem',
      flex: '5',
    },
    [scrSize.large]: {
      flex: '6',
    },
  },
  infoWrapper: {
    [scrSize.small]: {
      margin: '0 2rem',
      display: 'flex',
      flexDirection: 'column',
      width: 'calc(100% - 4rem)',
    },
    [scrSize.medium]: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
    },
    [scrSize.large]: {
    },
  },
  infoText: {
    fontFamily: 'poppins-light',
    fontSize: '1.375rem',
    opacity: '0.8',
    lineHeight: '2.4rem',
    [scrSize.small]: {
      width: '100%',
    },
    [scrSize.large]: {
      width: '75%',
    },
  },
  worksWith: {
    [scrSize.small]: {
      marginTop: '2rem',
      marginBottom: '2rem'
    },
    [scrSize.small]: {
      marginTop: '3rem',
      marginBottom: '3rem'
    },

    [scrSize.large]: {
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
    [scrSize.small]: {
      flexWrap: 'wrap',
      textAlign:'center',
      justifyContent: 'center',
    },
    [scrSize.medium]: {
      flexWrap: 'wrap',
    },
    [scrSize.large]: {
    },
  },
  logo: {
    backgroundPosition: 'center center',
    [scrSize.small]: {
      marginRight: '1.2rem',
      marginBottom: '1.5rem',
    },
    [scrSize.medium]: {
      marginRight: '1.2rem',
      marginBottom: '1.5rem',
    },
    [scrSize.large]: {
      marginRight: '1.4rem',
    },
    ':last-child': {
      marginRight: '0'
    }
  }
})

export default birdsEyeView
