import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const hardSell = StyleSheet.create({
  mainContainer: {
    maxWidth: '1280px',
    margin: 'auto',
    display: 'flex',
  },
  dronePic: {
    width: '50%',
    flex: '1',
  },
  image: {
    width: '100%'
  },
  salesCopy: {
    flex: '1',
    fontSize: '1.4rem',
    fontFamily: 'poppins-light',
    marginTop: '2rem'
  },
  boldCopy: {
    fontWeight: 'bolder',
    width: '80%',
    margin: '3rem auto'
  },
  normalCopy: {
    width: '80%',
    margin: '3rem auto'
  }
})

export default hardSell
