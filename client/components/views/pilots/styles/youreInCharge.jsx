import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const youreInCharge = StyleSheet.create({
  container: {
    width: '100%',
    background: colors.blue,
    overflow: 'auto'
  },
  formatter: {
    justifyContent: 'space-between',
    display: 'flex',
    [scrSize.small]: {
      flexDirection: 'column',
    },
    [scrSize.medium]: {
      flexDirection: 'row',
      width: '100%',
      margin: 'auto',
    },
    [scrSize.large]: {
      maxWidth: '1100px',
    },
  },
  youreInCharge: {
    position: 'relative',
    color: colors.white,
    [scrSize.small]: {
      width: '100%',
    },
    [scrSize.medium]: {
      width: '45%',
    }
  },
  arrowLayout: {
    position: 'absolute',
    bottom: '50px',
    right: '-70px',
    width: '110px',
    height: '24px',
    [scrSize.small]: {
      display: 'none',
    }
  },
  arrowIcon: {
    width: '110px',
    height: '24px',
  },
  signupOnline: {
    background: colors.white,
    overflow: 'auto',
    [scrSize.small]: {
      width: '100%',
    },
    [scrSize.medium]: {
      width: '45%'
    }
  },
  yicWrapper: {
    margin: '0rem 1rem 3rem 1rem',
  },
  soWrapper: {
    margin: '3rem 1rem',
  },
  buttonWrapper: {
    [scrSize.small]: {
      padding: '0 0.8rem',
      margin: '2rem auto 0.8rem auto',
    },
    [scrSize.medium]: {
      padding: '0 2rem',
      margin: '2rem auto 0.8rem auto',
    },
  },
  buttonIcon: {
    width: '20px',
    height: '24px',
    display: 'inline-block',
    marginRight: '0.6rem',
  },
  yicHeader: {
    fontSize: '1.6rem',
    [scrSize.small]: {
      textAlign: 'center',
    },
    [scrSize.medium]: {
      textAlign: 'left',
    },
  },
  soHeader: {
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    fontSize: '1.6rem',
  },
  yicTitle: {
    fontSize: '1.4rem',
    [scrSize.small]: {
      textAlign: 'center',
    },
    [scrSize.medium]: {
      textAlign: 'left',
    },
  },
  yicText: {
    fontFamily: 'poppins-light',
    [scrSize.small]: {
      textAlign: 'center',
      fontSize: '1rem',
      lineHeight: '1.6rem',
      marginBottom: '1.6rem',
    },
    [scrSize.medium]: {
      textAlign: 'left',
      fontSize: '1.2rem',
      lineHeight: '2rem',
      marginBottom: '2rem',
    },
  },
  smallText:{
    padding: '0 1rem',
    color: colors.grey,
  },
  blueText: {
    textTransform: 'uppercase',
    color: colors.blue,
    textAlign: 'center',
    [scrSize.small]: {
      fontSize: '1rem',
      lineHeight: '1.4rem'
    },
    [scrSize.medium]: {
      fontSize: '1.2rem',
      lineHeight: '1.6rem'
    },
  }
})

export default youreInCharge
