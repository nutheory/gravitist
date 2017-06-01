import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const howItWorks = StyleSheet.create({
  instruction: {
    position: 'relative',
  },
  stepNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    background: colors.blue,
    color: colors.white
  },
})

export default howItWorks
