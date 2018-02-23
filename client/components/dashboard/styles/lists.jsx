// @flow
import { StyleSheet, css } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const lists = StyleSheet.create({
  listContainer:{
    margin: '2rem 0 4rem 0'
  },
  deck: {
    display: 'flex',
    margin: '-1.5rem',
    flexWrap: 'wrap',
  },
  column: {
    width:'100%',
    [ss.md]: {
      width: '48%'
    },
    [ss.lg]: {
      margin: '1rem',
      width: 'calc(33% - 2rem)'
    }
  }
})

export default lists
