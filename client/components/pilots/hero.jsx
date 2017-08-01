import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import ScrollDown from '../misc/scrollDown'
import heroPhoto from '../../assets/images/pilotHero.jpg'
import scrollDownIcon from '../../assets/svg/scrollDown.svg'
import hero from './styles/hero'
import cL from '../../styles/commonLayout'
import cE from '../../styles/commonElements'
import cT from '../../styles/commonText'


class Hero extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(cL.heroContainer)}>
        <div className={css(cL.heroBg)} style={{background: `url(/${heroPhoto}) no-repeat`}}>
          <div className={css(cL.heroOverlay)}></div>
          <h1 className={css(cT.synopsis)}>Fly with Homefilming</h1>
          <p className={css(hero.subText)}>Earn money. Fly when you want.</p>
          <div className={css(cE.ctaButtons)}>
            <NavLink
              className={css(cE.cta, cE.redButton)}
              to=""
            >Get Started Now</NavLink>
          </div>
          <ScrollDown to="/" />
        </div>
      </div>
    )
  }
}

export default Hero
