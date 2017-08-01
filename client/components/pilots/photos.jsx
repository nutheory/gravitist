import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import ph from './styles/photos'
import photo1 from '../../assets/images/drone1@2x.jpg'
import photo2 from '../../assets/images/drone2@2x.jpg'

const Photos = () => {
  return (
    <div className={css(ph.container)}>
      <div className={css(ph.mainPhoto)} style={{ background: `url(/${photo1}) no-repeat`}}></div>
      <div className={css(ph.mainPhoto)} style={{ background: `url(/${photo2}) no-repeat`}}></div>
    </div>
  )
}

export default Photos
