import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const missionCard = StyleSheet.create({
  pilotInfoLeft: {
    width: 'calc(45% - 1px)',
    display: 'flex',
    justifyContent: 'center',
    borderRight: '1px solid #b8c2cc'
  },
  pilotInfoRight: {
    width: '55%',
    display: 'flex',
    justifyContent: 'center'
  },
  pilotInnerBlock: {
    display: 'inline-block'
  },
  dollarWrapper: {
    position: 'relative',
    paddingLeft: '0.9rem'
  },
  carWrapper: {
    textAlign: 'right',
    position: 'relative',
    paddingRight: '1rem'
  },
  dollarIcon: {
    fontSize: '1.25rem',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '1rem',
    height: '1.5rem',
    color: '#1f9d55'
  },
  carIcon: {
    fontSize: '1.25rem',
    position: 'absolute',
    top: '0',
    right: '0',
    width: '1rem',
    height: '1.2rem',
    color: '#2779bd'
  },
  numbers: {
    fontSize: '2.75rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold',
    lineHeight: '2.5rem'
  },
  footerLeft: {
    fontSize: '0.75rem',
    textAlign: 'right'
  },
  footerRight: {
    fontSize: '0.75rem'
  }
})

export default missionCard
