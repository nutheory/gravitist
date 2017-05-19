import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const section = {
  fontFamily: 'poppins-semibold',
  borderRadius: '4px',
  border: '1px solid #e5e5e5',
  boxShadow: '1px 1px 2px #5e5e5e',
  padding: '1rem 2.6rem 2rem 2.6rem',
}

const sectionHeader = {
  fontFamily: 'poppins-bold',
  fontSize: '2.5rem',
  textTransform: 'uppercase',
  width: '100%',
  textAlign: 'center',
}



const order = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    margin: '3rem auto 5rem auto',
  },
  sectionHeader: {
    ...sectionHeader
  },
  head: {
    display: 'flex',
  },
  plan:{
    ...section,
    background: 'red'
  },
  addressMapper:{

  },
  main: {

  },
  signup: {

  },
  payment: {

  },
  footer: {

  },
  terms: {

  },
  submit: {

  },
})

export default order
