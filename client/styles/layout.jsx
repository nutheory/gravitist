import { StyleSheet, css } from 'aphrodite'

const layoutCss = StyleSheet.create({
  headerBar: {
    backgroundColor: '#fff',
    position: 'fixed',
  },
  buttonSpacing: {
    marginLeft:'20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px 0 20px',
    width:'3.2em',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px 0 20px'
  }
})

export default layoutCss
