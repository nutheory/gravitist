import { StyleSheet, css } from 'aphrodite'
import { ss, c } from './helpers'

const commonErrors = StyleSheet.create({
  areaHidden: {
    margin: '0',
    padding: '0',
    maxHeight: '0px',
    overflowY: 'hidden',
  },
  area: {
    margin: '1rem 0',
    overflowY: 'hidden',
    margin: '1rem 0 ',
    padding: '1rem',
    maxHeight: '500px',
    transitionProperty: 'all',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'cubic-bezier(0, 1, 0, 1)'
  },
  section: {
    padding: '0.4rem 0',
  },
  header: {
    color: c.white,
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontSize: '1.8rem',
  },
  title: {
    color: c.white,
    fontSize: '1.2rem',
  },
  text: {
    color: c.white,
    fontSize: '1rem',
  },
  buttonWithOutline: {
    border: '1px solid #FFF !important',
    textDecoration: 'none',
    color: c.white,
    padding: '0.4rem 1rem',
    borderRadius: '.33rem',
    marginTop: '1rem',
    display: 'inline-block',
    ':visited': {
      color: c.white
    },
    ':link': {
      color: c.white
    },
    ':hover': {
      backgroundColor: 'rgba(47, 170, 193, 0.4)',
    }
  }
})

export default commonErrors
