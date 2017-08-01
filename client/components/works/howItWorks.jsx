import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'aphrodite'
import Header from '../misc/header'
import hiw from './styles/howItWorks'
import cL from '../../styles/commonLayout'
import cT from '../../styles/commonText'
import cE from '../../styles/commonElements'
import account from '../../assets/svg/account.svg'
import drone from '../../assets/svg/drone.svg'
import packages from '../../assets/svg/packages.svg'
import post from '../../assets/svg/post.svg'
import sells from '../../assets/svg/sells.svg'

const instructions = [
  {img: account, text: "Create an Account" },
  {img: packages, text: "Choose a Package" },
  {img: drone, text: "Our Pilot Flys Your Listing" },
  {img: post, text: "We Edit The Photos and Video and Send It To You" },
  {img: sells, text: "Your Listing Sells and You Get Paid!" },
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
