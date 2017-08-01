import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import cL from '../../styles/commonLayout'
import cT from '../../styles/commonText'
import cE from '../../styles/commonElements'
import hiw from './styles/howItWorks'
import account from '../../assets/svg/account.svg'
import drone from '../../assets/svg/drone.svg'
import upload from '../../assets/svg/upload.svg'
import paid from '../../assets/svg/get-paid.svg'

const instructions = [
  {img: account, text: "Accept The Mission" },
  {img: drone, text: "Fly The House" },
  {img: upload, text: "Upload The Photos And Video" },
  {img: paid, text: "Your Listing Sells And You Get Paid!" }
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
