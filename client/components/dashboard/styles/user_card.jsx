// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const userCard = StyleSheet.create({
  card: {
    background: '#f5f8fa',
  },
  cardVitals: {
    position: 'relative',
    display: 'flex',
    margin: '0.4rem 0 1rem 0',
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgBlue}`,
    borderRadius: b.radius,
    background: c.bBgBlue,
    color: c.bTextBlue
  },
  flyRadius: {
    position: 'absolute',
    top: '4px',
    right: '4px'
  },
  typeIcon: {
    flex: '0',
    marginRight: '0.8rem',
    height: '44px'
  },
  apiInfo: {
    flex: '1'
  },
  apiIdName: {
    fontSize: '0.8rem'
  },
  apiId: {
    fontSize: '1.4rem',
    lineHeight: '1.4rem',
    fontWeight: '600'
  },
  footerButton: {
    background: '#fff',
    ':hover': {
      background: c.bBgGreen
    }
  }
})

export default userCard
