// @flow
import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const gallery = StyleSheet.create({
  imageItem: {
    position: 'relative'
  },
  imageActions: {
    position: 'absolute',
    bottom: '1.4rem',
    right: '1rem',
    padding: '0.2rem 0.4rem',
    borderRadius: '3px',
    border: `1px solid ${c.grey}`,
    background: c.white,
    color: c.lightGrey,
    ':hover': {
      border: `1px solid ${c.bFgGreen}`,
      cursor: 'pointer'
    }
  },
  imageSelected: {
    border: `1px solid ${c.bFgGreen}`,
    background: c.bBgGreen,
    color: c.green,
  }
})

export default gallery
