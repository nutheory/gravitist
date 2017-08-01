import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import bnr from './styles/banner'
import cT from '../../styles/commonText'
import cE from '../../styles/commonElements'
import calendar from '../../assets/svg/calendar-when-you-want.svg'
import money from '../../assets/svg/make-money.svg'

const bannerItems = [
  {img: money, title: "Make great money", text: "You can fly and earn as much as you want. The more you fly, the more you’ll make."},
  {img: calendar, title: "Fly when you want", text: "Only fly when it works for you. Its your business."}
]

const banner = (bi, i) => {
  return (
    <div key={`bi_${i}`} className={css(bnr.banner)}>
      <div className={css(bnr.imgIconWrapper)}><img src={`/${bi.img}`} alt={bi.title} className={css(cE.imgIconWrapper)} /></div>
      <div className={css(bnr.floatLeft)}>
        <h4 className={css(cT.smallTitle, bnr.smallTitle, bnr.textLeft)}>{bi.title}</h4>
        <p className={css(cT.smallText, bnr.textLeft)}>{bi.text}</p>
      </div>
    </div>
  )
}

const Banner = () => {
  return (
    <div className={css(bnr.container)}>
      {bannerItems.map((bi, i) => { return banner(bi, i)})}
    </div>
  )
}

export default Banner
