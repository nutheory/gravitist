import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import wyg from './styles/whatYouGet'
import general from './styles/general'
import videos from '../../../assets/svg/videos.svg'
import post from '../../../assets/svg/post.svg'
import pro from '../../../assets/svg/pro.svg'
import drone from '../../../assets/svg/drone.svg'
import insured from '../../../assets/svg/insured.svg'
import fortyEight from '../../../assets/svg/48.svg'

const WhatYouGet = () => {

  const features = [
    { img: videos, text: "High resolution photos and videos" },
    { img: post, text: "Post production and editing" },
    { img: pro, text: "Prompt and professional service" },
    { img: drone, text: "FAA licensed pilot" },
    { img: insured, text: "Fully insured" },
    { img: fortyEight, text: "48-hour turnaround" },
  ]

  const feature = (ft, i) => {
    return (
      <div key={i} className={css(wyg.feature)}>
        <div className={css(wyg.featureImgWrapper)}><img src={`/${ft.img}`} alt={ft.img} className={css(general.iconImg)} /></div>
        <div className={css(wyg.featureText)}>{ft.text}</div>
      </div>
    )
  }

  return (
    <div className={css(wyg.container, general.wrapper)}>
      <h1 className={css(general.sectionHeader)}>What you get</h1>
      <div className={css(wyg.featuresList)}>
        {features.map((ft, i) => { return feature(ft, i)})}
      </div>
    </div>
  )
}

export default WhatYouGet
