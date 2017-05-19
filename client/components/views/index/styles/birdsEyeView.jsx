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
    flex: '5',
  },
  info: {
    flex: '7',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '4rem',
    marginTop: '6rem',
    width: '70%',
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
    width: '75%',
    lineHeight: '2.4rem',
  },
  worksWith: {
    marginTop: '4rem',
    marginBottom: '8rem'
  },
  worksWithHeader: {
    fontFamily: 'poppins-bold',
    textTransform: 'uppercase',
  },
  worksWithLogos: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: '2.2rem',
    backgroundPosition: 'center center',
  }
})

export default birdsEyeView
