import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import heroPhoto from '../../../assets/images/homeHero.jpg'
import playIcon from '../../../assets/svg/playIcon.svg'
import scrollDownIcon from '../../../assets/svg/scrollDown.svg'
import hero from './styles/hero'
import cE from '../../../styles/commonElements'
import cT from '../../../styles/commonText'

class Hero extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(hero.container)}>
        <div className={css(hero.bg)} style={{background: 'url(/' + heroPhoto + ') no-repeat'}}>
          <div className={css(hero.overlay)}></div>
          <h1 className={css(cT.synopsis)}>We make aerial videos for residential real estate agents</h1>
          <ul className={css(hero.bulletPoints)}>
            <li className={css(hero.point)}>Nationwide coverage</li>
            <li className={css(hero.point)}>48-hour turnaround</li>
          </ul>
          <div className={css(cE.ctaButtons)}>
            <NavLink
              className={css(cE.cta, cE.redButton)}
              to=""
            >VIEW PRICING</NavLink>
            <NavLink
              className={css(cE.cta, cE.blueButton)}
              to=""
            ><img src={`/${playIcon}`} className={css(hero.playIcon)} alt="play sample" /> VIEW SAMPLE VIDEO</NavLink>
          </div>
          <div className={css(hero.scrollDown)}>
            <div className={css(hero.scrollDownInner)}>
              <NavLink
                to=""
              >
                <img src={`/${scrollDownIcon}`} className={css(hero.scrollDownIcon)} alt="" /><br />
                <span className={css(hero.scrollDownText)}>Scroll Down to Learn More</span>
            </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
