import { StyleSheet } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const register = StyleSheet.create({
  avatarArea: {
    textAlign: 'center'
  },
  avatar: {
    color: `${c.teal}`,
    border: `6px dashed ${c.teal}`,
    borderRadius: '64px',
    width: '128px',
    height: '128px',
  },
  uploadArea: {
    border: `4px dashed ${c.teal}`,
    borderRadius: '8px',
    background: `${c.lightGrey}`,
    padding: '8px',
  },
  uploadIconContainer:{
    textAlign: 'center',
  },
  uploadIcon: {
    color: `${c.teal}`,
    width: '48px',
    height: '48px',
  },
  uploadTitle: {
    color: `${c.grey}`,

  },
  uploadDescription: {
    color: `${c.grey}`,

  }
})

export default register
