import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const progress = StyleSheet.create({
  bg: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '6px',
    backgroundImage: 'linear-gradient(-180deg,#dbdbdb 0,#7a7a7a 100%)',
    width: '100%',
    height: '3.8rem',
    zIndex: '1'
  },
  border: {
    position: 'absolute',
    zIndex: '4',
    width: '100%',
    height: '3.8rem',
    borderRadius: '6px',
    border: '4px solid #34566b',
    boxShadow: 'inset 0 0 10px #000000'
  },
  bar: {
    position: 'absolute',
    zIndex: '2',
    width: '107%',
    height: '3.8rem',
    borderRadius: '24px',
    boxShadow: '1px 1px 2px #0a0a0a',
    background: '#ad5389',
    background: '-webkit-linear-gradient(to top, #3c1053, #ad5389)',
    background: 'linear-gradient(to top, #3c1053, #ad5389)'
  },
  percent: {
    position: 'absolute',
    top: '1.8rem',
    right: '1.2rem',
    zIndex: '3',
    fontSize: '1.4rem',
    fontFamily: '"Droid serif", Times, serif',
    textShadow: '2px 2px 2px #000',
    color: '#b560cc'
  }
})

export default progress
