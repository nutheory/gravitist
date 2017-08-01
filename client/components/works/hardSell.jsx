import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'aphrodite'
import hs from './styles/hardSell'
import drone from '../../assets/images/whiteDrone@2x.png'

const HardSell = () => {
  return (
    <div className={css(hs.mainContainer)}>
      <div className={css(hs.dronePic)}>
        <img src={drone} className={css(hs.image)} alt="drone image" />
      </div>
      <div className={css(hs.salesCopy)}>
        <p className={css(hs.boldCopy)}>Be honest with yourself: does your real estate
          photography do your listings any justice?</p>

        <p className={css(hs.boldCopy)}>Or is it just more of the same old front yard,
          back yard, kitchen and bathroom… like every other
          realtor on the block?</p>

        <p className={css(hs.normalCopy)}>In a competitive industry, you need to stand out
          from your competition—and that’s where our aerial
          drone photography and videography service comes to
          knock your listings out of the park—skywards!</p>

        <p className={css(hs.normalCopy)}>Not only will you show off your property in a
          unique way that no-one else is, drone videos also
          increase the quality of serious buyers for better
          showings and higher offers.</p>
      </div>
    </div>
  )
}

export default HardSell
