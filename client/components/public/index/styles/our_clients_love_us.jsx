// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const loveUs = StyleSheet.create({
  container: {
    background: '#f5f8fa',
    overflow: 'auto',
    borderTop: `1px solid ${c.lightGrey}`,
    borderBottom: `1px solid ${c.lightGrey}`,
  },
  innerContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    padding: '2rem 0',
    overflow: 'auto',
  },
  outerBoxTall: {
    flex: '1',
    width: '100%',
    justifyContent: 'center',
    background: c.white,
    borderRadius: '4px',
    border: `1px solid ${c.midGrey}`,
    boxShadow: '5px 5px 8px #ccc',
    position: 'relative',
    zIndex: '15',
    [ss.lg]: {
      maxWidth: '340px',
    }
  },
  outerBoxShort: {
    flex: '1',
    justifyContent: 'center',
    margin: '1.6rem 0',
    background: '#f5f5f5',
    ':first-child': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      borderTop: `1px solid ${c.lightGrey}`,
      borderBottom: `1px solid ${c.lightGrey}`,
      borderLeft: `1px solid ${c.lightGrey}`,
    },
    ':last-child': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTop: `1px solid ${c.lightGrey}`,
      borderBottom: `1px solid ${c.lightGrey}`,
      borderRight: `1px solid ${c.lightGrey}`,
    },
    [ss.lg]: {
      maxWidth: '340px',
    }
  },
  head: {
    textAlign: 'center',
    padding: '2rem 0',
    borderBottom: `1px solid ${c.lightGrey}`,
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
