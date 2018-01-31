import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const avatar = StyleSheet.create({
  image: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden'
  },
  large: {
    width: '72px',
    height: '72px',
    borderRadius: '36px'
  },
  medium: {
    width: '48px',
    height: '48px',
    borderRadius: '24px'
  },
  small: {
    width: '24px',
    height: '24px',
    borderRadius: '12px'
  },
  imgTag: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  imglarge: {
    borderRadius: '36px'
  },
  imgmedium: {
    borderRadius: '24px'
  },
  imgsmall: {
    borderRadius: '12px'
  },
})

export default avatar
