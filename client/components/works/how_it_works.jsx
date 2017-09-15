import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'aphrodite'
import Header from '../misc/header'
import hiw from './styles/how_it_works'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'
import cE from '../../styles/common_elements'

const instructions = [
  {img: require('../../assets/svg/account.svg'), text: "Create an Account" },
  {img: require('../../assets/svg/packages.svg'), text: "Choose a Package" },
  {img: require('../../assets/svg/drone.svg'), text: "Our Pilot Flys Your Listing" },
  {img: require('../../assets/svg/post.svg'), text: "We Edit The Photos and Video and Send It To You" },
  {img: require('../../assets/svg/sells.svg'), text: "Your Listing Sells and You Get Paid!" },
]

const instruction = (ins, i) => {
  return (
    <div key={`ins_${i}`} className={css(cE.fiveBoxSingle, hiw.instruction)}>
      <div className={css(hiw.stepNumber)}>{i+1}</div>
      <div className={css(cE.imgIconWrapper)}><img src={`/${ins.img}`} alt={ins.text} /></div>
      <div className={css(cT.smallText)}>{ins.text}</div>
    </div>
  )
}

const HowItWorks = () => {
  return (
    <div>
      <div className={css(cL.fourContainer)}>
        <div className={css(cL.wrapper)}>
          <Header title="How it works" />
          <div className={css(cE.fiveBoxArea)}>
            {instructions.map((ins, i) => { return instruction(ins, i) } )}
          </div>
          <div className={css(cL.centerSelf)}><NavLink to="" className={css(cE.cta, cE.blueButton)}>Get Started Now</NavLink></div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
