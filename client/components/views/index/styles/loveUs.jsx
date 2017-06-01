import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const loveUs = StyleSheet.create({
  container: {

  },
  innerContainer: {
    width: '80%',
    margin: 'auto',
    display: 'flex',

  },
  outerBoxTall: {
    flex: '1',
    width: '100%',
    justifyContent: 'center',
    borderRadius: '4px',
    border: `1px solid ${colors.midGrey}`,
    boxShadow: '5px 5px 8px #ccc',
    position: 'relative',
    zIndex: '15',
  },
  outerBoxShort: {
    flex: '1',
    justifyContent: 'center',
    margin: '1.6rem 0',
    background: '#f5f5f5',
    ':first-child': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      borderTop: `1px solid ${colors.lightGrey}`,
      borderBottom: `1px solid ${colors.lightGrey}`,
      borderLeft: `1px solid ${colors.lightGrey}`,
    },
    ':last-child': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTop: `1px solid ${colors.lightGrey}`,
      borderBottom: `1px solid ${colors.lightGrey}`,
      borderRight: `1px solid ${colors.lightGrey}`,
    },
  },
  head: {
    textAlign: 'center',
    padding: '2rem 0',
    borderBottom: `1px solid ${colors.lightGrey}`,
  },
  avatar: {
    width: '64px',
    height: '64px',
    margin: 'auto',
    borderRadius: '32px'
  },
  name: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  starImg: {
    width: '16px',
    height: '16px',
  },
  body: {
    margin: '2rem',
  },
  qoute: {
    textAlign: 'center',
  }
})

export default loveUs
