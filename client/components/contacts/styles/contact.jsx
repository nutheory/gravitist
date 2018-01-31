import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const contact = StyleSheet.create({
  contactSplitSection: {
    display: 'flex'
  },
  contactContent: {
    flex: '2'
  },
  contactButtonArea: {
    flexGrow: 0,
    display: 'flex'
  },
  contactDisplayType: {
    color: c.bFgSoftGrey,
    fontWeight: '600'
  },
  contactButtonMinus: {
    border: `1px solid ${c.bFgSoftGrey}`,
    background: c.bBgSoftGrey,
    color: c.bTextSoftGrey,
    ':hover': {
      border: `1px solid ${c.bTextSoftGrey}`
    }
  },
  contactButtonDefaultUnselected: {
    border: `1px solid ${c.bFgSoftGrey}`,
    background: c.bBgSoftGrey,
    color: '#ccc',
    ':hover': {
      border: `1px solid ${c.bFgYellow}`
    }
  },
  contactButtonDefault: {
    border: `1px solid ${c.bFgYellow}`,
    background: c.bBgYellow,
    color: c.bFgYellow
  },
  contactButtonPlus: {
    border: `1px solid ${c.bFgBlue}`,
    background: c.bBgBlue,
    color: c.bTextBlue,
    ':hover': {
      border: `1px solid ${c.bTextBlue}`,
    }
  },
  contactButtonMinus: {
    marginRight: '0.75rem'
  },
  contactDropdown: {
    width: '30rem',
    overflow: 'auto'
  },
  contactDropdownItem: {
    width: '10rem',
    float: 'left',
    padding: '0.25rem 0.75rem',
    display: 'block'
  },
  removeButton: {
    backgroundColor: 'rgba(212,0,88,1)'
  },
  smallDisplay: {
    paddingTop: '0.4rem',
    fontSize: '1rem'
  },
  mediumDisplay: {
    paddingTop: '0.2rem',
    fontSize: '1.4rem'
  },
  largeDisplay: {
    paddingTop: '0.2rem',
    fontSize: '1.8rem'
  },
  subduedIcon: {
    marginRight: '0.6rem',
    color: c.midGrey
  }
})

export default contact
