// @flow
import { StyleSheet } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const notes = StyleSheet.create({
  notesContainer: {

  },
  notesHeader: {
    margintop: '2rem',
    marginBottom: '0'
  },
  prevLink: {
    paddingBottom: '0.6rem'
  },
  prevContainer: {
    transitionDuration: '0.3s',
    transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)',
    maxHeight: '0px',
    overflowY: 'hidden'
  },
  open: {
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-in',
    maxHeight: '1000px',
    overflowY: 'hidden'
  },
  noteItem: {
    margin: '1px',
    marginBottom: '1rem'
  },
  textbox: {
    minHeight: '86px'
  },
  submitButton: {
    border: `1px solid ${c.bFgBlue}`,
    background: c.bBgBlue,
    color: c.bTextBlue,
    height: '100%',
    paddingLeft: '1.6rem',
    paddingRight: '1.6rem',
    ':hover': {
      background: '#e5f4fd'
    }
  }

})

export default notes
