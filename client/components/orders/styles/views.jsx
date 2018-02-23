// @flow
import { StyleSheet } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const views = StyleSheet.create({
  addressHeader: {
    alignSelf: 'center'
  },
  addressOneTwoHeader: {
    fontSize: '1.6rem',
    lineHeight: '1.4rem',
    marginTop: '0.4rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: '600',
  },
  dateHeader: {
    fontSize: '1.6rem',
    lineHeight: '1.6rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: '600',
  },
  statusText: {
    fontSize: '2rem',
    lineHeight: '1.8rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: '600',
  },
  blueArea: {
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgBlue}`,
    borderRadius: b.radius,
    background: c.bBgBlue,
    color: c.bTextBlue
  },
  greenArea: {
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgGreen}`,
    borderRadius: b.radius
  },
  receiptIcon: {
    marginLeft: '0.8rem',
    height: '40px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  receiptIdLink: {
    textDecoration: 'none'
  },
  receiptIconInner: {
    height: '26px',
    width: '120px',
  },
  receiptInfo: {
    flex: '1'
  },
  smallTitle: {
    fontSize: '0.8rem'
  },
  bigText: {
    fontSize: '1.2rem',
    lineHeight: '1.4rem',
    fontWeight: '600'
  },
  videoPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0rem',
    height: '16rem',
    border: `1px solid ${c.bFgGrey}`,
    borderRadius: b.radius,
    background: c.bBgGrey,
    color: c.bTextGrey
  },
  pageTitle: {
    // borderBottom: `1px solid ${c.bFgSoftGrey}`,
    paddingBottom: '0.6rem'
  },
  filmIcon: {
    transform: 'rotate(-15deg)'
  },
  pilotValue: {
    marginRight: '0.6rem',
    display: 'inline-block',
    fontSize: '2rem',
    lineHeight: '1rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold'
  },
  pilotText: {
    display: 'inline-block',
    fontSize: '0.8rem',
    lineHeight: '1rem'
  },
  detailSection: {
    margin: '1.5rem 0'
  }
})

export default views
