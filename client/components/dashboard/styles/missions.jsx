// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const missions = StyleSheet.create({
  droneWatermark: {
    background: `url(${require('../../../assets/svg/common-drone.svg')})`,
    backgroundSize: '100% 100%',
    height: '100%',
    width: '100%'
  },
  header: {
    background: c.white
  },
  mission: {
    background: '#f5f8fa',
    borderRadius: '4px',
    boxShadow: b.shadow,
    marginBottom: '1rem',
    border: `1px solid ${c.lightGrey}`
  },
  missionAccepted: {
    background: '#e4f3fb',
    borderRadius: '4px',
    boxShadow: b.shadow,
    marginBottom: '1rem',
    border: `1px solid ${c.lightGrey}`
  },
  missionHeader: {
    background: '#f5f8fa',
    borderRadius: '4px',
    boxShadow: b.shadow,
    marginBottom: '1.5rem',
    padding: '1rem',
    border: `1px solid ${c.lightGrey}`
  },
  headerTitle: {
    display: 'inline-block',
    fontSize: '0.8rem',
    lineHeight: '1rem',
  },
  headerValue: {
    marginRight: '0.6rem',
    display: 'inline-block'
  },
  bigText: {
    fontSize: '2rem',
    lineHeight: '1rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold',
    color: c.grey
  },
  infoWrapper: {
    alignSelf: 'center'
  },
  infoItem: {
    display: 'inline-block',
    padding: '0.2rem 1rem',
    borderRight: `1px solid ${c.lightGrey}`,
    ':first-child': {
      paddingLeft: '0'
    }
  },
  infoItemHeader: {
    display: 'inline-block',
    padding: '0.2rem 1rem',
    borderRight: `1px solid ${c.lightGrey}`,
    ':last-child': {
      paddingRight: '0.4rem',
      borderRight: 'none'
    }
  },
  value: {
    marginTop: '0.2rem',
    textAlign: 'center',
    fontSize: '2.4rem',
    lineHeight: '2rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold',
    color: c.grey
  },
  label: {
    fontSize: '0.8rem',
    lineHeight: '0.8rem',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  address: {
    alignSelf: 'center'
  },
  addressHeader: {
    alignSelf: 'center',
    padding: '0 0.5rem'
  },
  addressOneTwo: {
    fontSize: '1.4rem',
    lineHeight: '1.2rem',
    marginTop: '0.4rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: '600',
  },
  addressOneTwoHeader: {
    fontSize: '2rem',
    lineHeight: '1.8rem',
    marginTop: '0.4rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: '600',
  },
  detailSection: {
    marginBottom: '1.5rem'
  }
})

export default missions
