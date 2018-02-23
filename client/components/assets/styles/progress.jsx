import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const progress = StyleSheet.create({
  progressArea: {
    marginTop: '2rem'
  },
  progressBar: {
    width: '90%',
    margin: '-2rem auto 2rem auto'
  },
  content: {
    width: '100%',
    margin: 'auto'
  },
  percent: {
    textAlign: 'right',
    verticalAlign: 'top',
    display: 'inline-block',
    width: '30%',
    fontSize: '5rem',
    lineHeight: '5.2rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold',
  },
  info: {
    display: 'inline-block',
    paddingLeft: '1rem',
    width: 'calc(70% - 1rem)',
  },
  infoHeader: {
    fontSize: '1.4rem'
  },
  infoText: {
    lineHeight: '1.3rem'
  }
})

export default progress
