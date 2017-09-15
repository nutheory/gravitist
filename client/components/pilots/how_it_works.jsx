import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'
import cE from '../../styles/common_elements'
import hiw from './styles/how_it_works'

const instructions = [
  {img: require('../../assets/svg/account.svg'), text: "Accept The Mission" },
  {img: require('../../assets/svg/drone.svg'), text: "Fly The House" },
  {img: require('../../assets/svg/upload.svg'), text: "Upload The Photos And Video" },
  {img: require('../../assets/svg/get-paid.svg'), text: "Your Listing Sells And You Get Paid!" }
]

const instruction = (ins, i) => {
  return (
    <div key={`ins_${i}`} className={css(cE.fourBoxSingle, hiw.instruction)}>
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
          <div className={css(cE.fourBoxArea)}>
            {instructions.map((ins, i) => { return instruction(ins, i) } )}
          </div>
          <div className={css(cL.centerSelf)}><NavLink to="" className={css(cE.cta, cE.blueButton)}>Fly With Us</NavLink></div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
