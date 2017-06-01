import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import yic from './styles/youreInCharge'
import cL from '../../../styles/commonLayout'
import cT from '../../../styles/commonText'
import cE from '../../../styles/commonElements'
import upload from '../../../assets/svg/icon-upload-white.svg'
import arrow from '../../../assets/svg/drawn-arrow.svg'

const YoureInCharge = () => {
  return (
    <div className={css(yic.container)}>
      <div className={css(cL.wrapper)}>
        <div className={css(yic.formatter)}>
          <div className={css(yic.youreInCharge)}>
            <div className={css(yic.yicWrapper)}>
              <h2 className={css(cT.sectionHeader, yic.yicHeader)}>You're In Charge</h2>
              <h4 className={css(cT.smallTitle, yic.yicTitle)}>Getting started is fast and easy</h4>
              <p className={css(cT.smallText, yic.yicText)}>Sign up today and you’ll be flying in no time. Signing up takes only a couple of minutes.</p>
              <p className={css(cT.smallText, yic.yicText)}>Don’t wait to start making great money with your drone!</p>
              <div className={css(yic.arrowLayout)}><img src={`/${arrow}`} alt="arrow" /></div>
            </div>
          </div>
          <div className={css(yic.signupOnline)}>
            <div className={css(yic.soWrapper)}>
              <h2 className={css(yic.soHeader)}>Sign Up Online</h2>
              <h4 className={css(cT.smallTitle)}>Tell us a little about yourself and your drone</h4>
              <NavLink className={css(cE.cta, cE.blueButton, yic.buttonWrapper)} to="">
                <img className={css(yic.buttonIcon)} src={`/${upload}`} alt="upload" />Share Some Paperwork
              </NavLink>
              <p className={css(cT.smallText, yic.smallText)}>Just upload your FAA license number, and proof of insurance.</p>
              <p className={css(yic.blueText)}>Get approved as an independent contractor - You are good to go!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoureInCharge
