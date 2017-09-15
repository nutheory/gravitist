import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'aphrodite'
import qs from './styles/quick_stats'
import Header from '../misc/header'
import cL from '../../styles/common_layout'

const charts = [
  {img: require('../../assets/svg/68.svg'), text: "According to MLS, homes with aerial images sold 68 percent faster than homes with standard images"},
  {img: require('../../assets/svg/85.svg'), text: "85 percent of buyers and sellers want to work with an agent who uses video, however, only 9 percent of agents create listing videos"},
  {img: require('../../assets/svg/4.svg'), text: "Homes listed with video get four times the inquiries of homes listed without video"},
  {img: require('../../assets/svg/75.svg'), text: "Including video in emails doubles the click-through rate and reduces opt-outs by 75 percent"}
]

const chart = (ch, i) => {
  return (
    <div key={`chart_${i}`} className={css(qs.chart)}>
      <div className={css(qs.imgWrapper)}>
        <img src={ch.img} alt={`chart ${i+1}`} />
      </div>
      <p className={css(qs.paragraph)}>{ch.text}</p>
    </div>
  )
}

const QuickStats = () => {
  return (
    <div>
      <div className={css(cL.wrapper)}>
        <Header title="Quick Stats" />
        <div className={css(qs.container)}>
          {charts.map((ch, i) => { return chart(ch, i) } )}
        </div>
      </div>
    </div>
  )
}

export default QuickStats
