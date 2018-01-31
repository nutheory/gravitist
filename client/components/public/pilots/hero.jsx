// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import ScrollDown from '../scroll_down'
import hero from './styles/hero'
import cL from '../../../styles/common_layout'
import cE from '../../../styles/common_elements'


const Hero = () => {
  return(
    <div className={css(cL.heroContainer)}>
      <div className={css(cL.heroBg)} style={{background: `url(${require('../../../assets/images/pilotHero.jpg')}) no-repeat`}}>
        <div className={css(cL.heroOverlay)}></div>
        <div className={css(hero.wrapper)}>
          <div className={css(hero.infoRight)}>
            <h1 className={css(hero.synopsis)}>Fly with Homefilming</h1>
            <p className={css(hero.infoText)}>Earn money. Fly when you want.</p>
            <NavLink className={css(cE.ctaButton, cE.ctaGreen, hero.button)} to="/pilots/register">
              <span className={css(cE.ctaButtonOverlay)}></span>
              Get Started
            </NavLink>
          </div>
        </div>
        <ScrollDown to="/" />
      </div>
    </div>
  )
}

export default Hero
