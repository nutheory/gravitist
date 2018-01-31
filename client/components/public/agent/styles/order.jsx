// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const section = {
  margin: '2rem 0'
}

const sectionHeader = {
  fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif !important',
  fontSize: '1.2rem',
  width: '100%',
}

const order = StyleSheet.create({
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
  summary: {
    flexGrow: '1',
    display: 'flex',
    flexBasis: '33%',
    flexDirection: 'column',
    padding: '0',
    borderRadius: '4px 0 0 4px',
  },
  mainArea: {
    // display: 'flex',
    flexBasis: '66%',
    flexGrow: '1',
    padding: '2rem 2rem',
    // flexDirection: 'column',
  },
  section: {
    ...section
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
  paymentInput: {
    fontSize: '1.4rem',
    fontFamily: 'Helvetica Neue, Arial, sans-serif !important',
    backgroundColor: c.white,
    borderRadius: '3px',
    padding: 'calc(0.75rem - 1px)',
    border: '1px solid #dbdbdb',
    color: '#363636',
    boxShadow: 'inset 0 1px 2px rgba(10, 10, 10, 0.1)',
  },
  buttonArea: {
    padding: '1rem 0'
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
