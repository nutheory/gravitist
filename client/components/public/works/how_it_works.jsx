// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import Header from '../header'
import hiw from './styles/how_it_works'
import cL from '../../../styles/common_layout'
import cT from '../../../styles/common_text'
import cE from '../../../styles/common_elements'

const instructions = [
  {icon: 'fa fa-gift', bg: cE.gradRed, text: "Choose a package" },
  {icon: 'fa fa-plane', bg: cE.gradBlue, text: "Our pilot flys your listing" },
  {icon: 'far fa-pencil-alt', bg: cE.gradGreen, text: "We edit the photos and video" },
  {icon: 'fa fa-dollar-sign', bg: cE.gradOrange, text: "Your listing sells and you get paid" },
]

const charts = [
  {icon: 'fas fa-chart-area', bg: cE.gradIntuitive, text: "According to MLS, homes with aerial images sold 68 percent faster than homes with standard images"},
  {icon: 'fa fa-percent', bg: cE.gradMirage, text: "85 percent of buyers and sellers want to work with an agent who uses video, however, only 9 percent of agents create listing videos"},
  {icon: 'fas fa-chart-pie', bg: cE.gradStrain, text: "Homes listed with video get four times the inquiries of homes listed without video"},
  {icon: 'far fa-envelope', bg: cE.gradMango, text: "Including video in emails doubles the click-through rate and reduces opt-outs by 75 percent"}
]

const createChartBullets = (sp, i) => {
  return (
    <div key={i} className={css(cE.bullet)}>
      <div className={css(cE.imgIconWrapper, cE.gradButton, sp.bg)}>
        <i className={`${css(cE.iconFix)} ${sp.icon} fa-2x`} />
      </div>
      <div className={css(cT.bulletListTextSmall)}>{sp.text}</div>
    </div>
  )
}

const createHiwBullets = (sp, i) => {
  return (
    <div key={i} className={css(cE.bullet)}>
      <div className={css(cE.imgIconWrapper, cE.gradButton, sp.bg)}>
        <i className={`${css(cE.iconFix)} fa fa-${sp.icon} fa-2x`} />
      </div>
      <div className={css(cT.bulletListText)}>{sp.text}</div>
    </div>
  )
}

const HowItWorks = () => {
  return (
    <div className={css(cE.twoColumnLists)}>
      <div className={css(cE.bulletList)}>
        <div className={css(cL.wrapper)}>
          <div className={css(cT.bulletListTitle)}>How it works</div>
          <div className={css(cE.fourBoxArea)}>
            {instructions.map((ins, i) => { return createHiwBullets(ins, i) } )}
          </div>
        </div>
      </div>
      <div className={css(cE.bulletList)}>
        <div className={css(cL.wrapper)}>
          <div className={css(cT.bulletListTitle)}>A few stats</div>
          <div className={css(cE.fourBoxArea)}>
            {charts.map((ins, i) => { return createChartBullets(ins, i) } )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
