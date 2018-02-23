// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const orderCard = StyleSheet.create({
  card: {
    background: '#f5f8fa',
  },
  header: {
    display: 'flex',
    textTransform: 'capitalize',
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '0.2rem',
    marginBottom: '0.6rem',
  },
  planTitle: {
    wordBreak: 'normal',
    flex: '0',
    marginBottom: '0rem',
  },
  rightTitle: {
    flex: '1',
  },
  statusText: {
    textTransform: 'capitalize',
  },
  smallUppercase: {
    textTransform: 'uppercase',
    fontSize: '0.7rem'
  },
  smallUppercaseRight: {
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    textAlign: 'right'
  },
  address: {
    margin: '0.4rem 0 0 0'
  },
  createdTitle: {
    textTransform: 'uppercase',
      textAlign: 'right',
      fontSize: '0.7rem'
  },
  rightText: {
    textAlign: 'right'
  },
  cardFooter: {
    display: 'flex',
    background: '#fff',
    borderTop: '1px solid #dbdbdb'
  },
  cardFooterItemLeft: {
    display: 'block',
    flex: '4',
    padding: '0.75rem 1.5rem',
    borderRight: '1px solid #dbdbdb'
  },
  cardFooterItemRight: {
    padding: '0.75rem',
    display: 'flex',
    flex: '2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeLeftPadding: {
    paddingLeft: '0'
  },
  removeRightPadding: {
    paddingRight: '0'
  }
})

export default orderCard
