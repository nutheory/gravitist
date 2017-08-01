import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const uploads = StyleSheet.create({
  PhotoDrop: {
    borderRadius: '8px',
    border: '6px dashed #999',
    width: '220px',
    height: '180px',
    textAlign: 'center',
    paddingTop: '1rem'
  },

  UploadIcon: {
    color: `${c.teal}`,
    width: '8rem',
    height: '6rem'
  },

  VideoDrop: {
    borderRadius: '8px',
    border: '6px dashed #999',
    width: '220px',
    height: '180px'
  }

})

export default uploads
