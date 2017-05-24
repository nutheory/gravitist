import { StyleSheet, css } from 'aphrodite'
import { scrSize } from './cssFunc'
import Colors from './colors'

const commonText = StyleSheet.create({
  synopsis: {
    fontFamily: 'poppins-bold',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: Colors.white,
    textTransform: 'uppercase',
    position: 'relative',
    textAlign: 'center',
    zIndex: '10',
    textShadow: '1px 1px 2px #0a0a0a',
    [scrSize.desktop]: {
      width: '75%',
      fontSize: '3.5rem',
    },
    [scrSize.smartphone]: {
      width: '90%',
      fontSize: '1.6rem',
    }
  },
  sectionHeader: {
    fontFamily: 'poppins-bold',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
    [scrSize.desktop]: {
      fontSize: '2.5rem',
    },
    [scrSize.smartphone]: {
      fontSize: '2rem',
    }
  },

})

export default commonText
