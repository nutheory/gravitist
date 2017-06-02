import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const stories = StyleSheet.create({
  container: {

  },
  storyList: {
    [ss.sm]: {

    },
    [ss.md]: {
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
    background: c.white,
    borderRadius: '4px',
    border: `1px solid ${c.midGrey}`,
    boxShadow: '5px 5px 8px #ccc',
    [ss.sm]: {
      padding: '2rem',
    },
    [ss.md]: {
      width: 'calc(50% - 8rem - 2px)',
      padding: '2rem',
      margin: '2rem',
    },
  },
  innerContainer: {
    [ss.sm]: {
      display: 'flex',
      overflow: 'auto',
      textAlign: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    [ss.md]: {
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
    [ss.sm]: {
      margin: 'auto',
    },
    [ss.md]: {

    },
  },
  nameLocation: {
    [ss.md]: {
      flex: '3',
      marginLeft: '1.4rem',
    },
  },
  name: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.4rem',
    margin: '0.4rem 0',
    [ss.sm]: {
      textAlign: 'center',
    },
  },
  location: {
    fontFamily: 'poppins-semibold',
    fontSize: '1rem',
    margin: '0.4rem 0',
    [ss.sm]: {
      textAlign: 'center',
    },
  },
  qoute: {
    fontFamily: 'poppins-light',
    fontSize: '1rem',
    lineHeight: '1.2rem',
    [ss.sm]: {
      textAlign: 'center',
    },
  },
})

export default stories
