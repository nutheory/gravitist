import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import ScrollDown from '../misc/scroll_down'
import cE from '../../styles/common_elements'
import cL from '../../styles/common_layout'
import hero from './styles/hero'

const Hero = () => {
  return(
    <div className={css(cL.heroContainer)}>
      <div className={css(cL.heroBg)} style={{background: `url(${require('../../assets/images/homeHero.jpg')}) no-repeat`}}>
        <div className={css(cL.heroOverlay)}></div>
        <div className={css(hero.wrapper)}>
          <div className={css(hero.synopsis)}>We make aerial videos for residential real estate agents</div>
          <div className={css(hero.ctaButtons)}>
            <div className={css(hero.ctaButtonLeft)}>
              <Link className={css(cE.ctaButton, cE.ctaGreen)} to="/pricing">
                <span className={css(cE.ctaButtonOverlay)}></span>
                View Pricing
              </Link>
            </div>
            <div className={css(hero.ctaButtonRight)}>
              <Link className={css(cE.ctaButton, cE.ctaPurple)} to={{pathname: '/sample-video', state: { modal: true} }}>
                <span className={css(cE.ctaButtonOverlay)}></span>
                View Sample Video
              </Link>
            </div>
          </div>
        </div>
        <ScrollDown to="/" />
      </div>
    </div>
  )
}

export default Hero
