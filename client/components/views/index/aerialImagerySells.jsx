import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import ais from './styles/aerialImagerySells'
import general from './styles/general'
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
      <div key={i} className={css(ais.sellingPoint)}>
        <div className={css(ais.pointImgWrapper)}><img src={`/${sp.img}`} alt={sp.img} className={css(general.iconImg)} /></div>
        <div className={css(ais.pointText)}>{sp.text}</div>
      </div>
    )
  }

  return (
    <div className={css(ais.container, general.wrapper)}>
      <h1 className={css(general.sectionHeader)}>Aerial imagery sells</h1>
      <div className={css(ais.sellingPointList)}>
        {points.map((pt, i) => { return sellingPoint(pt, i)})}
      </div>
    </div>
  )
}

export default AerialImagerySells
