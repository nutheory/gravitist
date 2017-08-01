import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../../../styles/cssFunc'

const layout = StyleSheet.create({
  stepper: {
    maxWidth: 720,
    margin: 'auto'
  },
  authFormsContainer: {
    display: 'flex',
    width: '960px',
    marginTop: '40px',
  },
  sectionTitle: {
    marginLeft: '1em',
    marginRight: '1em',
    marginBottom: '0'
  },
  signup: {
    flex: 2,
  },
  login: {
    flex: 1,
  },
  loginSidebar: {
    marginLeft: '20px',
    borderLeft: '1px solid #666',
    paddingLeft: '20px',
  },
  cardContainer: {
    display: 'flex',
    width: '960px',
    marginTop: '40px',
  },
  cardDisplay: {
    flex: 1
  },
  cardForm: {
    flex: 1
  },
  addressToFilmContainer: {
    display: 'flex',
    width: '960px',
    marginTop: '40px',
  },
  addressForm: {

  },
  addressDisplay: {

  }
})



export default layout
