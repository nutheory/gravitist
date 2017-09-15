import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import ScrollDown from '../misc/scroll_down'
import cE from '../../styles/common_elements'
import cT from '../../styles/common_text'
import cL from '../../styles/common_layout'
import hero from './styles/hero'

class Hero extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(cL.heroContainer)}>
        <div className={css(cL.heroBg)} style={{background: `url(${require('../../assets/images/homeHero.jpg')}) no-repeat`}}>
          <div className={css(cL.heroOverlay)}></div>
          <h1 className={css(cT.synopsis)}>We make aerial videos for residential real estate agents</h1>
          <ul className={css(hero.bulletPoints)}>
            <li className={css(hero.point)}>Nationwide coverage</li>
            <li className={css(hero.point)}>48-hour turnaround</li>
          </ul>
          <div className={css(cE.ctaButtons)}>
            <NavLink
              className={css(cE.cta, cE.redButton)}
              to="/pricing"
            >VIEW PRICING</NavLink>
            <Link
              className={css(cE.cta, cE.blueButton)}
              to={{pathname: '/sample-video', state: { modal: true} }}
            ><img src={require('../../assets/svg/playIcon.svg')} className={css(hero.playIcon)} alt="play sample" /> VIEW SAMPLE VIDEO</Link>
          </div>
          <ScrollDown to="/" />
        </div>
      </div>
    )
  }
}

export default Hero
