import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import heroPhoto from '../../../assets/images/homeHero.jpg'
import playIcon from '../../../assets/svg/playIcon.svg'
import scrollDownIcon from '../../../assets/svg/scrollDown.svg'
import homeHero from './styles/homeHero'

class HomeHero extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(homeHero.container)}>
        <div className={css(homeHero.bg)} style={{background: 'url(/' + heroPhoto + ') no-repeat'}}>
          <div className={css(homeHero.overlay)}></div>
          <h1 className={css(homeHero.synopsis)}>We make aerial videos for residential real estate agents</h1>
          <ul className={css(homeHero.bulletPoints)}>
            <li className={css(homeHero.point)}>Nationwide coverage</li>
            <li className={css(homeHero.point)}>48-hour turnaround</li>
          </ul>
          <div className={css(homeHero.ctaButtons)}>
            <NavLink
              className={css(homeHero.cta, homeHero.redButton)}
              to=""
            >VIEW PRICING</NavLink>
            <NavLink
              className={css(homeHero.cta, homeHero.blueButton)}
              to=""
            ><img src={`/${playIcon}`} className={css(homeHero.playIcon)} alt="play sample" /> VIEW SAMPLE VIDEO</NavLink>
          </div>
          <div className={css(homeHero.scrollDown)}>
            <div className={css(homeHero.scrollDownInner)}>
              <NavLink
                to=""
              >
                <img src={`/${scrollDownIcon}`} className={css(homeHero.scrollDownIcon)} alt="" /><br />
                <span className={css(homeHero.scrollDownText)}>Scroll Down to Learn More</span>
            </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeHero
