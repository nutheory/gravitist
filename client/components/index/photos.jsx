import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from 'react-slick'
import styles from './styles/photos'
import photo1 from '../../assets/images/home1@2x.jpg'
import photo2 from '../../assets/images/home2@2x.jpg'
import photo3 from '../../assets/images/home3@2x.jpg'

const Photos = () => {
  let width = window.innerWidth
  if (width > 1023) {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.photo)}><img src={photo1} alt="photo 1" className={css(styles.photoImg)} /></div>
        <div className={css(styles.photo)}><img src={photo2} alt="photo 2" className={css(styles.photoImg)} /></div>
        <div className={css(styles.photo)}><img src={photo3} alt="photo 3" className={css(styles.photoImg)} /></div>
      </div>
    )
  } else {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className={css(styles.container)}>
        <Slider {...settings}>
          <div className={css(styles.photo)}><img src={photo1} alt="photo 1" className={css(styles.photoImg)} /></div>
          <div className={css(styles.photo)}><img src={photo2} alt="photo 2" className={css(styles.photoImg)} /></div>
          <div className={css(styles.photo)}><img src={photo3} alt="photo 3" className={css(styles.photoImg)} /></div>
        </Slider>
      </div>
    )
  }

}

export default Photos
