import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const general = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: '3rem 0 5rem 0'
  },
  sectionHeader: {
    fontFamily: 'poppins-bold',
    fontSize: '2.5rem',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center'
  },
  iconImg: {
    width: '64px',
    height: '64px',
  },
  callToAction: {
    width: '100%',
    height: '64px',
    color: Colors.white,
    borderRadius: '32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default general
