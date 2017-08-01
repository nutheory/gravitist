import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const summary = StyleSheet.create({
  container: {
    display: 'flex',
    // padding: '1rem',
    alignItems: 'flex-start',
    width: '600px',
    background: c.lightGrey,
  },
  mainInfo: {
    margin: '1rem',
    // flex: '1',
    width: 'calc(50% - 2rem)',
  },
  features: {
    margin: '1rem',
    // flex: '1',
    width: 'calc(50% - 2rem)',
  },
  featuresList: {
    margin: '0'
  },
  planTitle: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.6rem',
    margin: '0',
  },
  planDesc: {
    fontFamily: 'poppins-light',
    fontSize: '0.8rem',
    margin: '0.6rem 0',
  },
  priceArea: {
    display: 'inline-block',
  },
  price: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.4rem',
  },
  dollarSign: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.0rem',
    verticalAlign: 'top',
  },
  cents: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.0rem',
  },
  change: {
    display: 'inline-block',
    marginLeft: '10px',
  },
  icon: {
    width: '16px',
    height: '16px',
    marginRight: '10px',
    float: 'left',
    display: 'block'
  },
  featureDesc: {
    fontFamily: 'poppins-light',
    margin: '0',
    float: 'left',
    paddingBottom: '0px',
    width: '80%',
  },
  footer: {

  }
})

export default summary
