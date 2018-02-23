// @flow
import { StyleSheet } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const form = StyleSheet.create({
  notesHeader: {
    marginTop: '2rem',
    marginBottom: '1remm'
  },
  receiptLink: {
    position: 'relative',
    display: 'flex',
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgBlue}`,
    borderRadius: b.radius,
    background: c.bBgBlue,
    color: c.bTextBlue
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
  receiptTitle: {
    fontSize: '0.8rem'
  },
  receiptId: {
    fontSize: '1.4rem',
    lineHeight: '1.4rem',
    fontWeight: '600'
  },
  updateButton: {
    display: 'block',
    height: '100%',
    padding: '0.54rem 1rem'
  },
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

export default form
