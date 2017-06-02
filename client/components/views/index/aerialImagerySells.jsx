import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import ais from './styles/aerialImagerySells'
import cE from '../../../styles/commonElements'
import cL from '../../../styles/commonLayout'
import cT from '../../../styles/commonText'
import money from '../../../assets/svg/money.svg'
import buyers from '../../../assets/svg/buyers.svg'
import listings from '../../../assets/svg/listings.svg'
import standOut from '../../../assets/svg/standOut.svg'

const AerialImagerySells = () => {

  const points = [
    {img: money, text: 'Your listing sells faster and you get paid sooner'},
    {img: buyers, text: 'You get better buyers, better showings, fewer looky loos'},
    {img: listings, text: 'You get more listings and better listings'},
    {img: standOut, text: 'You will be stand out from the competition'}
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
