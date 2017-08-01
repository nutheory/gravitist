import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const banner = StyleSheet.create({
  container: {
    marginTop: '3rem',
    marginBottom: '3rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  smallTitle: {
    margin: '0.4rem 0',
    [ss.md]: {
      margin: '0'
    }
  },
  imgIconWrapper: {
    [ss.sm]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '0',
    },
    [ss.md]: {
    }
  },
  banner: {
    display: 'flex',

    [ss.sm]: {
      width: '100%',
      flexWrap: 'wrap',
      marginBottom: '3rem',
      ':last-child': {
        marginBottom: '0',
      }
    },
    [ss.md]: {
      width: '40%',
    }
  },
  floatLeft: {
    paddingLeft: '1rem',
    flex: '3'
  },
  textLeft: {
    [ss.md]: {
      textAlign: 'left',
    }
  }
})

export default banner
