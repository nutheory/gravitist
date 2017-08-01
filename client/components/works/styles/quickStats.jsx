import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const quickStats = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1080px',
    margin: 'auto',
    justifyContent: 'center',
  },
  chart: {
    padding: '2rem',
    margin: '2rem',
    width: 'calc(50% - 8rem - 4px)',
    border: `1px solid ${c.grey}`,
  },
  imgWrapper: {
    textAlign: 'center',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    textAlign: 'center'
  },
})

export default quickStats
