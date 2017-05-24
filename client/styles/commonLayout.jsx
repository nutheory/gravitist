import { StyleSheet, css } from 'aphrodite'
import { scrSize } from './cssFunc'
import Colors from './colors'

const commonLayout = StyleSheet.create({
  wrapper: {
    width: '100%',
    [scrSize.desktop]: {
      padding: '3rem 0 5rem 0',
    },
    [scrSize.smartphone]: {
      padding: '1rem 0 2rem 0'
    }
  },
})

export default commonLayout
