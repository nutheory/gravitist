// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const summary = StyleSheet.create({
  container: {
    borderRadius: '4px 0 0 4px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    color: c.white,
    background: '#141E30',
    background: '-webkit-linear-gradient(to bottom, #243B55, #141E30)',
    background: 'linear-gradient(to bottom, #243B55, #141E30)',
  },
  mainInfo: {
    margin: '2rem 1rem 0 2rem',
  },
  features: {
    margin: '0rem',
  },
  featuresList: {
    margin: '0 1.6rem'
  },
  planTitle: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif !important',
    fontWeight: '300',
    fontSize: '1.6rem',
    margin: '0',
  },
  planDesc: {
    fontSize: '1rem',
    margin: '0.6rem 0',
  },
  priceArea: {
    display: 'block',
    float: 'right'
  },
  price: {
    fontSize: '2.4rem',
  },
  dollarSign: {
    fontSize: '1.0rem',
    verticalAlign: 'top',
  },
  cents: {
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
    margin: '0',
    float: 'left',
    paddingBottom: '0px',
    width: '80%',
  },
  previewArea:{
    width: '100%',
    height: '100%',
    fontSize: '2.0rem',
    zIndex: '200',
    opacity: '1',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column'
  },
  priceText: {
    display: 'block',
    marginRight: '1rem',
  },
  footer: {
    display: 'flex',
    padding: '1rem',
    borderTop: '1px solid #fff'
  }
})

export default summary
