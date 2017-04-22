import { StyleSheet, css } from 'aphrodite'

const layoutCss = StyleSheet.create({
  headerBar: {
    backgroundColor: '#FFF',
    position: 'fixed',
    borderBottom: '1px solid #000',
  },
  buttonSpacing: {
    marginLeft:'20px',
  },
  logoArea: {
    position: 'fixed',
    left: '10%',
    margin: '0 !important',
  },
  logo: {
    width:'12em',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px 0 20px'
  }
})

module.exports = layoutCss
