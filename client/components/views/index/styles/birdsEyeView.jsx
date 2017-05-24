import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const birdsEyeView = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
  },
  drone: {
    backgroundSize: '720px 560px',
    backgroundPosition: '-60px 10px',
    [scrSize.desktop]: {
      flex: '5',
    },
    [scrSize.smartphone]: {
      display: 'none'
    }
  },
  info: {
    [scrSize.desktop]: {
      flex: '7',
    },
    [scrSize.smartphone]: {
      textAlign: 'center',
      width: '100%'
    },
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [scrSize.desktop]: {
      width: '70%',
      marginLeft: '4rem',
      marginTop: '6rem',
    },
    [scrSize.smartphone]: {
      width: '100% - 4rem',
      margin: '2rem',
    },
  },
  sectionHeader: {
    fontFamily: 'poppins-bold',
    fontSize: '2.5rem',
    textTransform: 'uppercase',
    width: '100%',
    marginBottom: '0',
  },
  infoText: {
    fontFamily: 'poppins-light',
    fontSize: '1.375rem',
    opacity: '0.8',
    lineHeight: '2.4rem',
    [scrSize.desktop]: {
      width: '75%',
    },
    [scrSize.smartphone]: {
      width: '100%',
    }
  },
  worksWith: {
    [scrSize.desktop]: {
      marginTop: '4rem',
      marginBottom: '8rem'
    },
    [scrSize.smartphone]: {
      marginTop: '2rem',
      marginBottom: '2rem'
    }
  },
  worksWithHeader: {
    fontFamily: 'poppins-bold',
    textTransform: 'uppercase',
  },
  worksWithLogos: {
    display: 'flex',
    alignItems: 'center',
    [scrSize.desktop]: {
    },
    [scrSize.smartphone]: {
      flexWrap: 'wrap',
      textAlign:'center',
      justifyContent: 'center',
    }
  },
  logo: {
    backgroundPosition: 'center center',
    [scrSize.desktop]: {
      marginRight: '2.2rem',
    },
    [scrSize.smartphone]: {
      marginRight: '1.2rem',
      marginBottom: '1.5rem'
    }
  }
})

export default birdsEyeView
