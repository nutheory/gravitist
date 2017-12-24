import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const pricing = StyleSheet.create({
  container: {
    // display: 'flex',
    width: '70%',
    margin: '6rem auto',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  planList: {
    margin: '1rem -1rem 0 -1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  plan: {
    borderRadius: '4px',
    border: '1px solid #e5e5e5',
    background: 'rgba(255,255,255,0.3)',
    boxShadow: '6px 6px 20px #000',
    padding: '1rem 1.5rem',
    textShadow: '1px 1px 2px #0a0a0a',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    color: c.white,
    // [ss.sm]: {
    //   width: 'calc(100% - 4rem - 2px)',
    // },
    // [ss.md]: {
    //   width: 'calc(50% - 4rem - 2px)',
    //   ':last-child': {
    //     width: 'calc(100% - 4rem - 2px)'
    //   }
    // },
    [ss.lg]: {
    //   maxWidth: '440px',
      width: 'calc(50% - 5rem - 2px)',
    //   ':last-child': {
    //     width: 'calc(33.33333% - 4rem - 2px)'
    //   }
    },
  },
  header: {
    overflow: 'auto'
  },
  planTitle: {
    float: 'left',
    fontSize: '2.4rem',
    fontWeight: '100'
  },
  changeLink: {
    fontSize: '0.875rem',
  },
  details: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    flex: '1 0 auto'
  },
  planPrice: {
    float: 'right',
    fontSize: '2.4rem',
    fontWeight: '100'
  },
  desc: {
    padding: '1rem 0',
    flex: '1 1 100%',
    clear: 'both',
    fontSize: '1rem',
  },
  features: {
    padding: '1rem 0',
    listStyle: 'none',
  },
  feature: {
    marginBottom: '1.2rem',
    padding: '6px',
  },
  icon: {
    width: '2.4rem',
    height: '2.2rem',
    float: 'left',
    marginRight: '10px',
    textAlign: 'center'
  },
  featureDesc: {
    marginLeft: '3rem',
    margin: '0',
  },
  contactFooter: {
    textAlign: 'center',
    margin: '2rem 10rem',
    color: c.white
  }
})

export default pricing
