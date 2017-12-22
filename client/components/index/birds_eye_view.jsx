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
        <div className={css(cT.bevSynopsis)}>Birds Eye View</div>
        <p className={css(cT.infoText)}>Aerial imagery shows off the home and neighborhood in ways that old fashioned street level photography can’t.</p>
        <div className={css(cE.ctaButtons)}>
          <NavLink className={css(cE.ctaButton, cE.ctaGreen)} to="/pricing">
            <span className={css(cE.ctaButtonOverlay)}></span>
            Get Started
          </NavLink>
          <Link className={css(cE.ctaButton, cE.ctaPurple)} to={{pathname: '/sample-video', state: { modal: true} }}>
            <span className={css(cE.ctaButtonOverlay)}></span>
            How it Works
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BirdsEyeView
