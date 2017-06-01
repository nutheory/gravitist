import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const stories = StyleSheet.create({
  container: {

  },
  storyList: {
    [scrSize.small]: {

    },
    [scrSize.medium]: {
      display: 'flex',
      flexGrow: '1',
      overflow: 'auto',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '1200px',
      margin: 'auto',
    },
  },
  storyFrame: {
    background: colors.white,
    borderRadius: '4px',
    border: `1px solid ${colors.midGrey}`,
    boxShadow: '5px 5px 8px #ccc',
    [scrSize.small]: {
      padding: '2rem',
    },
    [scrSize.medium]: {
      width: 'calc(50% - 8rem - 2px)',
      padding: '2rem',
      margin: '2rem',
    },
  },
  innerContainer: {
    [scrSize.small]: {
      display: 'flex',
      overflow: 'auto',
      textAlign: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    [scrSize.medium]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  avatar: {
    backgroundSize: '160px',
    backgroundPosition: '-40px 0px',
    width: '96px',
    height: '96px',
    borderRadius: '48px',
    [scrSize.small]: {
      margin: 'auto',
    },
    [scrSize.medium]: {

    },
  },
  nameLocation: {
    [scrSize.medium]: {
      flex: '3',
      marginLeft: '1.4rem',
    },
  },
  name: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.4rem',
    margin: '0.4rem 0',
    [scrSize.small]: {
      textAlign: 'center',
    },
  },
  location: {
    fontFamily: 'poppins-semibold',
    fontSize: '1rem',
    margin: '0.4rem 0',
    [scrSize.small]: {
      textAlign: 'center',
    },
  },
  qoute: {
    fontFamily: 'poppins-light',
    fontSize: '1rem',
    lineHeight: '1.2rem',
    [scrSize.small]: {
      textAlign: 'center',
    },
  },
})

export default stories
