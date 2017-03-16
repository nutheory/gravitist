import { StyleSheet, css } from 'aphrodite'

const layoutCss = StyleSheet.create({
  headerBar: {
    backgroundColor: '#2B2A2A',
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
    width:'8em',
    img: {
      width: '160px',
      height: '34px'
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px 0 20px'
  }
})

export default layoutCss
