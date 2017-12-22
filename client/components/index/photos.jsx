import React from 'react'
import { StyleSheet, css } from 'aphrodite'
// import Slider from 'react-slick'
import styles from './styles/photos'

const Photos = () => {
  let width = window.innerWidth
  if (width > 1023) {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.photo)}><img src={require('../../assets/images/home1@2x.jpg')} alt="photo 1" className={css(styles.photoImg)} /></div>
        <div className={css(styles.photo)}><img src={require('../../assets/images/home2@2x.jpg')} alt="photo 2" className={css(styles.photoImg)} /></div>
        <div className={css(styles.photo)}><img src={require('../../assets/images/home3@2x.jpg')} alt="photo 3" className={css(styles.photoImg)} /></div>
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
        {/* <Slider {...settings}>
          <div className={css(styles.photo)}><img src={require('../../assets/images/home1@2x.jpg')} alt="photo 1" className={css(styles.photoImg)} /></div>
          <div className={css(styles.photo)}><img src={require('../../assets/images/home2@2x.jpg')} alt="photo 2" className={css(styles.photoImg)} /></div>
          <div className={css(styles.photo)}><img src={require('../../assets/images/home3@2x.jpg')} alt="photo 3" className={css(styles.photoImg)} /></div>
        </Slider> */}
      </div>
    )
  }

}

export default Photos
