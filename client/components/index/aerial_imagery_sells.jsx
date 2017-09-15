import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import ais from './styles/aerial_imagery_sells'
import cE from '../../styles/common_elements'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'

const AerialImagerySells = () => {

  const points = [
    {img: require('../../assets/svg/money.svg'), text: 'Your listing sells faster and you get paid sooner'},
    {img: require('../../assets/svg/buyers.svg'), text: 'You get better buyers, better showings, fewer looky loos'},
    {img: require('../../assets/svg/listings.svg'), text: 'You get more listings and better listings'},
    {img: require('../../assets/svg/standOut.svg'), text: 'You will be stand out from the competition'}
  ]

  const sellingPoint = (sp, i) => {
    return (
      <div key={i} className={css(cE.fourBoxSingle, ais.sellingPoint)}>
        <div className={css(cE.imgIconWrapper)}><img src={`/${sp.img}`} alt={sp.img} className={css(cE.iconImg)} /></div>
        <div className={css(cT.smallText)}>{sp.text}</div>
      </div>
    )
  }

  return (
    <div className={css(cL.fourContainer)}>
      <div className={css(cL.wrapper)}>
        <Header title="Aerial imagery sells" />
        <div className={css(cE.fourBoxArea)}>
          {points.map((pt, i) => { return sellingPoint(pt, i)})}
        </div>
      </div>
    </div>
  )
}

export default AerialImagerySells
