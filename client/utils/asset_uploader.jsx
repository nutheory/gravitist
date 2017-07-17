import React from 'react'
import Axios from 'axios'

const UploadWrapper = (type, file) => {
  return Axios.post('/asset-uploads', {type, file}, {
  }).then(res => { console.log('returned', res) })
}

export default UploadWrapper
