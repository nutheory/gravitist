// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import ScrollDown from '../scroll_down'
import hero from './styles/hero'
import cL from '../../../styles/common_layout'
import cE from '../../../styles/common_elements'

const Hero = () => {
  return (
    <div className={css(cL.heroContainer)}>
      <div className={css(cL.heroBg)} style={{background: `url(${require('../../../assets/images/homePhoto2.jpg')}) no-repeat`}}>
        <div className={css(cL.heroOverlay)}></div>
        <div className={css(hero.wrapper)}>
          <div className={css(hero.infoRight)}>
            <h1 className={css(hero.synopsis)}>Fly above your competition and skyrocket home sales</h1>
            <p className={css(hero.infoText)}>
              Show buyers unique drone photos and videos of your real estate listings for a
              fresh new perspective that increases sales.
            </p>
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
        </div>
        <ScrollDown to="/" />
      </div>
    </div>
  )
}

export default Hero
