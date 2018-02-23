// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const reorder = StyleSheet.create({
  pageTitle:{
    textTransform: 'uppercase',
    color: '#666',
    fontSize: '2rem',
    fontWeight: '100'
  },
  planOuter: {
    display: 'flex',
    flex: '1 1'
  },
  plan: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1'
  },
  details: {
    flexDirection: 'column',
    flex: '1 1'
  },
  icon: {
    display: 'block',
    width: '2.2rem',
    textAlign: 'center',
    paddingTop: '0.2rem'
  },
  featureText: {
    display: 'block',
    flex: '1',
  },
  feature: {
    display: 'flex',
    width: '100%',
    overflow: 'auto',
    margin: '0.4rem 0'
  }
})

export default reorder
