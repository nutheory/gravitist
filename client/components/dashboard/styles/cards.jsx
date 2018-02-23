// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const cards = StyleSheet.create({
  cardContent: {
    padding: '1rem',
    ':hover': {
      cursor: 'pointer',
      background: c.bBgYellow,
      boxShadow: b.shadow
    }
  },
  row: {
    display: 'flex',
    margin: '0 -0.6rem'
  },
  blueArea: {
    display: 'flex',
    margin: '0rem 0.6rem',
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgBlue}`,
    borderRadius: b.radius,
    background: c.bBgBlue,
    color: c.bTextBlue
  },
  highlightValue: {
    marginRight: '0.8rem',
    fontSize: '2.2rem',
    lineHeight: '2.2rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold'
  },
  highlightText: {
    fontSize: '0.8rem',
    lineHeight: '1rem'
  },
  address: {
    margin: '0.4rem 0 0 0'
  },
})

export default cards
