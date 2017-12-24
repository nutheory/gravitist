import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import bev from './styles/birds_eye_view'
import cT from '../../styles/common_text'
import cE from '../../styles/common_elements'

const BirdsEyeView = () => {
  return (
    <div className={css(bev.container)}>
      <div className={css(bev.infoWrapper)}>
        <div className={css(bev.synopsis)}>Birds Eye View</div>
        <p className={css(bev.infoText)}>Aerial imagery shows off the home and neighborhood in ways that old fashioned street level photography can’t.</p>
        <div className={css(bev.ctaButtons)}>
          <div className={css(bev.ctaButtonLeft)}>
            <NavLink className={css(cE.ctaButton, cE.ctaGreen)} to="/pricing">
              <span className={css(cE.ctaButtonOverlay)}></span>
              Get Started
            </NavLink>
          </div>
          <div className={css(bev.ctaButtonRight)}>
            <Link className={css(cE.ctaButton, cE.ctaPurple)} to="/how-it-works">
              <span className={css(cE.ctaButtonOverlay)}></span>
              How it Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirdsEyeView
