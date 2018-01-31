// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import yic from './styles/youre_in_charge'
import cL from '../../../styles/common_layout'
import cT from '../../../styles/common_text'
import cE from '../../../styles/common_elements'

const YoureInCharge = () => {
  return (
    <div className={css(yic.container)}>
      <div className={css(cL.wrapper)}>
        <div className={css(yic.formatter)}>
          <div className={css(yic.youreInCharge)}>
            <div className={css(yic.yicWrapper)}>
              <h2 className={css(yic.yicHeader)}>You're In Charge</h2>
              <h4 className={css(cT.smallTitle, yic.yicTitle)}>Getting started is fast and easy</h4>
              <p className={css(cT.smallText, yic.yicText)}>Sign up today and you’ll be flying in no time. Signing up takes only a couple of minutes.</p>
              <p className={css(cT.smallText, yic.yicText)}>Don’t wait to start making great money with your drone!</p>
              <div className={css(yic.arrowLayout)}><img src={require('../../../assets/svg/drawn-arrow.svg')} alt="arrow" /></div>
            </div>
          </div>
          <div className={css(yic.signup)}>
            <div className={css(yic.soWrapper)}>
              <h4 className={css(cT.smallTitle)}>Tell us a little about yourself and your drone</h4>
              <Link className={css(cE.ctaButton, cE.ctaGreen, yic.button)} to="/pilots/register">
                Sign up now
              </Link>
              <p className={css(cT.smallText, yic.smallText)}>Just upload your FAA license number, and proof of insurance.</p>
              <p className={css(yic.bottomText)}>Get approved as an independent contractor - You are good to go!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoureInCharge
