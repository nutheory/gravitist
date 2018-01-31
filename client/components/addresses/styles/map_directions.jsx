import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const mapDirections = StyleSheet.create({

  mapArea: {
    minWidth: '400px',
    minHeight: '400px',
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
    borderTop: '1px solid #999',
    padding: '0.6rem 0.4rem',
    color: '#999'
  }
})

export default mapDirections
