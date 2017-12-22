import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { css } from 'aphrodite'
import intro from './styles/intro'
import cE from '../../styles/common_elements'

const Intro = () => {

  const photos = [
    require('../../assets/images/homeHero.jpg'),
    require('../../assets/images/home1@2x.jpg'),
    require('../../assets/images/home2@2x.jpg'),
    require('../../assets/images/home3@2x.jpg')
  ]
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

      return ("hey"
        // <Slider {...settings}>
        //   {photos.map((ph, i) => { return photo(ph,i) })}
        // </Slider>
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
          ><img src={require('../../assets/svg/playIconBlue.svg')} className={css(intro.playIcon)} alt="play sample" /> VIEW SAMPLE VIDEO</Link>
        </div>
        <div className={css(intro.marketingPhotos)}>
          {renderPhotos()}
        </div>
      </div>
    </div>
  )
}

export default Intro
