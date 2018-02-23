// @flow
import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const share = StyleSheet.create({
  assetWrapper: {
    display: 'flex',
    padding: '0.6rem',
    background: '#000',
    border: '1px solid #333'
  },
  watermarked: {
    color: c.bFgBlue
  },
  asset: {
    flex: '1'
  },
  sidebar: {
    display: 'flex',
    marginLeft: '0.6rem',
    flex: '0',
    flexDirection: 'column'
  },
  tinyForm: {
    flex: '1'
  },
  formArea: {
    width: '100%'
  },
  formText: {
    fontSize: '0.8rem'
  },
  twitterButton: {
    color: '#fff',
    background: c.twitter
  },
  facebookButton: {
    color: '#fff',
    background: c.facebook,
  },
  icon: {
    textAlign: 'center',
    marginBottom: '0.4rem',
    ':hover': {
      cursor: 'pointer'
    }
  },
  spacer: {
    flex: '1 0 auto',
    flexDirection: 'column'
  },
  twitter: {
    ':hover': {
      color: c.twitter,
    }
  },
  facebook: {
    ':hover': {
      color: c.facebook,
    }
  },
  link: {
    position: 'relative',
    ':hover': {
      color: c.lightGrey
    }
  },
  isDefault: {
    color: c.bFgYellow
  },
  linkForm: {
    position: 'absolute',
    left: '-9999px'
  },
  watermark: {
    marginTop: '0.4rem',
    marginBottom: '0',
    ':hover': {
      color: c.bFgBlue
    }
  },
  default: {
    marginTop: '0.4rem',
    marginBottom: '0',
    ':hover': {
      color: c.bFgYellow
    }
  }
})

export default share
