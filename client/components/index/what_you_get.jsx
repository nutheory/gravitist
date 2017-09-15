import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import wyg from './styles/what_you_get'
import cE from '../../styles/common_elements'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'

const WhatYouGet = () => {

  const features = [
    { img: require('../../assets/svg/videos.svg'), text: "High resolution photos and videos" },
    { img: require('../../assets/svg/post.svg'), text: "Post production and editing" },
    { img: require('../../assets/svg/pro.svg'), text: "Prompt and professional service" },
    { img: require('../../assets/svg/drone.svg'), text: "FAA licensed pilot" },
    { img: require('../../assets/svg/insured.svg'), text: "Fully insured" },
    { img: require('../../assets/svg/48.svg'), text: "48-hour turnaround" },
  ]

  const feature = (ft, i) => {
    return (
      <div key={i} className={css(wyg.feature)}>
        <div className={css(wyg.featureImgWrapper)}><img src={`/${ft.img}`} alt={ft.img} className={css(cE.iconImg)} /></div>
        <div className={css(wyg.featureText)}>{ft.text}</div>
      </div>
    )
  }

  return (
    <div className={css(cL.fourPointContainer)}>
      <div className={css(cL.wrapper)}>
      <Header title="What you get" />
        <div className={css(wyg.featuresList)}>
          {features.map((ft, i) => { return feature(ft, i)})}
        </div>
      </div>
    </div>
  )
}

export default WhatYouGet
