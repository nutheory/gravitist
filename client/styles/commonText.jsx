import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from './helpers'

const commonText = StyleSheet.create({
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
    [scrSize.small]: {
      width: '90%',
      fontSize: '1.6rem',
    },
    [scrSize.large]: {
      width: '75%',
      fontSize: '3.5rem',
    },
  },
  sectionHeader: {
    fontFamily: 'poppins-bold',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
    [scrSize.small]: {
      fontSize: '1.4rem',
    },
    [scrSize.medium]: {
      fontSize: '2rem',
    }
  },
  smallTitle: {
    textAlign:'center',
    fontFamily: 'poppins-semibold',
    fontSize: '1.25rem',
  },
  smallText: {
    textAlign:'center',
    fontSize: '0.875rem',
    lineHeight: '1.4rem'
  }

})

export default commonText
