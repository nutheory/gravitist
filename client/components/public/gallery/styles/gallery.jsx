// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const gallery = StyleSheet.create({
  listingContainer: {
    display: 'flex'
  },
  videoLeft: {
    width: 'calc(70% - 1.5rem)',
    marginRight: '1.5rem'
  },
  dataRight: {
    width: '30%'
  }
})

export default gallery
