import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const section = {
  fontFamily: 'poppins-semibold',
  borderRadius: '4px',
  border: '1px solid #e5e5e5',
  boxShadow: '1px 1px 2px #5e5e5e',
  padding: '1rem 2rem 2rem 2rem',
  margin: '1rem'
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
    margin: '3rem auto 5rem auto',
    [scrSize.desktop]: {
      width: '70%',
    },
    [scrSize.smartphone]: {

    }
  },
  sectionHeader: {
    ...sectionHeader
  },
  head: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  plan: {
    ...section,
    flex: '2'
  },
  addressMapper: {
    ...section,
    flex: '5'
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  signup: {
    ...section,
    flex: '1'
  },
  payment: {
    ...section,
    flex: '1'
  },
  footer: {

  },
  terms: {

  },
  submit: {

  },
})

export default order
