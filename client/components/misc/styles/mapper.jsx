import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const mapper = StyleSheet.create({
  locationField: {
    width: '100%',
  },
  check: {
    color: c.green,
    transition: 'all .5s ease-in-out'
  },
  mapContainer: {
    width: '200px',
    height: '200px',
  }
})

export default mapper
