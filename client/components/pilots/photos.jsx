import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import ph from './styles/photos'

const Photos = () => {
  return (
    <div className={css(ph.container)}>
      <div className={css(ph.mainPhoto)} style={{ background: `url(${require('../../assets/images/drone1@2x.jpg')}) no-repeat`}}></div>
      <div className={css(ph.mainPhoto)} style={{ background: `url(${require('../../assets/images/drone2@2x.jpg')}) no-repeat`}}></div>
    </div>
  )
}

export default Photos
