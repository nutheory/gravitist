import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { css } from 'aphrodite'
import Slider from 'react-slick'
import intro from './styles/intro'
import playIcon from '../../../assets/svg/playIconBlue.svg'
import cE from '../../../styles/commonElements'
import photo0 from '../../../assets/images/homeHero.jpg'
import photo1 from '../../../assets/images/home1@2x.jpg'
import photo2 from '../../../assets/images/home2@2x.jpg'
import photo3 from '../../../assets/images/home3@2x.jpg'

const Intro = () => {

  const photos = [photo0, photo1, photo2, photo3]
  const photo = (ph,i) => {
    return (
      <div key={`photo_${i}`} className={css(intro.photoWrapper)}>
        <img src={ph} alt={`aerial_${i}`} className={css(intro.photo)} />
      </div>
    )
  }

  const renderPhotos = () => {
    let width = window.innerWidth

    if (width > 1023) {
      return photos.map((ph, i) => { return photo(ph,i) })
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
        <Slider {...settings}>
          {photos.map((ph, i) => { return photo(ph,i) })}
        </Slider>
      )
    }
  }

  return (
    <div className={css(intro.container)}>
      <div className={css(intro.innerContainer)}>
        <div className={css(intro.marketingCopy)}>
          <h1 className={css(intro.header)}>Fly Above Your Competition and Skyrocket Home Sales!</h1>
          <p className={css(intro.copy)}>Show buyers unique drone photos and videos of your real estate listings for a fresh new perspective that increases sales.</p>
          <Link
            className={css(cE.cta, cE.whiteButton)}
            to={{pathname: '/sample-video', state: { modal: true} }}
          ><img src={`/${playIcon}`} className={css(intro.playIcon)} alt="play sample" /> VIEW SAMPLE VIDEO</Link>
        </div>
        <div className={css(intro.marketingPhotos)}>
          {renderPhotos()}
        </div>
      </div>
    </div>
  )
}

export default Intro
