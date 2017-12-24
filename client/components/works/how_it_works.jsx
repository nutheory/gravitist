import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import Header from '../misc/header'
import hiw from './styles/how_it_works'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'
import cE from '../../styles/common_elements'

const instructions = [
  {icon: 'gift', bg: cE.gradRed, text: "Choose a package" },
  {icon: 'plane', bg: cE.gradBlue, text: "Our pilot flys your listing" },
  {icon: 'pencil', bg: cE.gradGreen, text: "We edit the photos and video" },
  {icon: 'usd', bg: cE.gradOrange, text: "Your listing sells and you get paid" },
]

const charts = [
  {icon: 'area-chart', bg: cE.gradIntuitive, text: "According to MLS, homes with aerial images sold 68 percent faster than homes with standard images"},
  {icon: 'percent', bg: cE.gradMirage, text: "85 percent of buyers and sellers want to work with an agent who uses video, however, only 9 percent of agents create listing videos"},
  {icon: 'pie-chart', bg: cE.gradStrain, text: "Homes listed with video get four times the inquiries of homes listed without video"},
  {icon: 'envelope-o', bg: cE.gradMango, text: "Including video in emails doubles the click-through rate and reduces opt-outs by 75 percent"}
]

const createChartBullets = (sp, i) => {
  return (
    <div key={i} className={css(cE.bullet)}>
      <div className={css(cE.imgIconWrapper, cE.gradButton, sp.bg)}>
        <i className={`${css(cE.iconFix)} fa fa-${sp.icon} fa-2x`} />
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
