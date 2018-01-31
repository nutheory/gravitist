import { StyleSheet } from 'aphrodite'
import { ss, c, b} from '../../../styles/helpers'

const badge = StyleSheet.create({
  rightText: {
    textAlign: 'right'
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
  removeLeftPadding: {
    paddingLeft: '0'
  },
  removeRightPadding: {
    paddingRight: '0'
  }
})

export default badge
