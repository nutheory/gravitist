import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

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
    [scrSize.medium]: {
      margin: '0'
    }
  },
  imgIconWrapper: {
    [scrSize.small]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '0',
    },
    [scrSize.medium]: {
    }
  },
  banner: {
    display: 'flex',

    [scrSize.small]: {
      width: '100%',
      flexWrap: 'wrap',
      marginBottom: '3rem',
      ':last-child': {
        marginBottom: '0',
      }
    },
    [scrSize.medium]: {
      width: '40%',
    }
  },
  floatLeft: {
    paddingLeft: '1rem',
    flex: '3'
  },
  textLeft: {
    [scrSize.medium]: {
      textAlign: 'left',
    }
  }
})

export default banner
