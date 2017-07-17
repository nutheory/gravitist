import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const mobileHeader = StyleSheet.create({
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    backgroundColor: "#fff",
    height: '52px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: `1px solid ${c.lightGrey}`
  },
  title: {
    flex: '1',
    paddingTop: '8px'
  },
  menu: {
    flex: '1',
    textAlign: 'right'
  },
  logoImg: {
    height: '14px',
    margin: '0 20px'
  },
  drawer: {
    display: 'flex',
    textAlign: 'right',
    height: '100%',
    flexDirection: 'column',
  },
  callInfo: {
    textAlign: 'right',
    marginTop: 'auto',
  },
  callInfoInner: {
    textAlign: 'right',
    // margin: '16px'
  },
  callNumber: {
    textAlign: 'right',
    fontSize: '1.7rem',
    textDecoration: 'none',
  },
  callLink: {
    marginBottom: '4px',
    display: 'inline-block',
    color: c.blue,
    textDecoration: 'none',
  }
})

export default mobileHeader
