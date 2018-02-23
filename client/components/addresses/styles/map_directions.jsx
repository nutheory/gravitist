import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const mapDirections = StyleSheet.create({

  mapArea: {
    minWidth: '300px',
    minHeight: '300px',
    marginBottom: '1.5rem'
  },
  mapDistance: {
    float: 'left',
    width: '50%',
    textAlign: 'right',
    color: '#999'
  },
  mapDuration: {
    float: 'left',
    width: '50%',
    textAlign: 'right',
    color: '#999'
  },
  mapHeadTitle: {
    display: 'inline-block',
    textAlign: 'right',
    fontSize: '0.8rem',
    lineHeight: '1rem',
    marginRight: '0.6rem'
  },
  mapHeadValue: {
    display: 'inline-block'
  },
  mapBigText: {
    fontSize: '2.4rem',
    fontFamily: '"Droid serif", Times, serif',
    fontWeight: 'bold',
    color: c.green
  },
  mapDirectionItem: {
    padding: '0.6rem 0.4rem',
    color: '#454545'
  },
  mapDirectionIcon: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '0.4rem 0.6rem 0 0',
    color: '#454545'
  },
  mapDirectionText: {
    display: 'inline-block',
    width: '85%',
    fontFamily: 'Helvetica Neue, Avenir Next, Arial, sans-serif',
  }
})

export default mapDirections
