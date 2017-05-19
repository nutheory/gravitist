import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from 'react-slick'
import styles from './styles/photos'
import photo1 from '../../../assets/images/home1@2x.jpg'
import photo2 from '../../../assets/images/home2@2x.jpg'
import photo3 from '../../../assets/images/home3@2x.jpg'

const Photos = () => {

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.photo)} style={{ background: `url(/${photo1}) no-repeat` }}></div>
      <div className={css(styles.photo)} style={{ background: `url(/${photo2}) no-repeat` }}></div>
      <div className={css(styles.photo)} style={{ background: `url(/${photo3}) no-repeat` }}></div>
    </div>
  )

}

export default Photos
