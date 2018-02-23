// @flow
import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const register = StyleSheet.create({
  container: {
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: 'rgba(255,255,255,1)',
    boxShadow: '2px 2px 8px #000',
    maxWidth: '60rem',
    display: 'flex',
    margin: '2rem auto',
    [ss.desktop]: {
      width: '70%',
    },
    [ss.smartphone]: {

    }
  },
  uploads: {
    borderRadius: '4px 0 0 4px',
    padding: '2rem',
    display: 'flex',
    flexBasis: '33%',
    flexDirection: 'column',
    flexGrow: '1',
    background: '#141E30',
    background: '-webkit-linear-gradient(to bottom, #243B55, #141E30)',
    background: 'linear-gradient(to bottom, #243B55, #141E30)',
  },
  upload: {
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
  },
  uploadTitle: {
    color: c.white,
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontWeight: '200',
    fontSize: '1.6rem'
  },
  uploadInstruct: {
    color: c.white,
    fontSize: '1rem'
  },
  mainArea: {
    flexBasis: '66%',
    flexGrow: '1',
    padding: '2rem',
  },
  vertAlignText: {
    alignSelf: 'center'
  },
  section: {
    margin: '2rem 0'
  },
  buttonArea: {
    padding: '1rem 0'
  },
  buttonAreaUnique: {
    padding: '0'
  },
  textBottomMargin: {
    marginBottom: '2rem'
  },
})

export default register
