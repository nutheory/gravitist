// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../header'
import cE from '../../../styles/common_elements'
import cL from '../../../styles/common_layout'
import cT from '../../../styles/common_text'

const FeaturesBenefits = () => {

  const points = [
    {name: 'fas fa-dollar-sign', bg: cE.gradRed, text: 'Your listing sells faster and you get paid sooner'},
    {name: 'fa fa-home', bg: cE.gradBlue, text: 'You get better buyers, better showings, fewer looky loos'},
    {name: 'fa fa-list', bg: cE.gradGreen, text: 'You get more listings and better listings'},
    {name: 'fas fa-chart-line', bg: cE.gradOrange, text: 'You will be stand out from the competition'}
  ]

  const features = [
    { name: 'fa fa-film', bg: cE.gradVice, text: "High resolution photos and videos" },
    { name: 'fas fa-pencil-alt', bg: cE.gradPeach, text: "Post production and editing" },
    { name: 'fa fa-signal', bg: cE.gradIntuitive, text: "Prompt and professional service" },
    { name: 'fa fa-plane', bg: cE.gradMirage, text: "FAA licensed pilot" },
    { name: 'far fa-gem', bg: cE.gradStrain, text: "Fully insured" },
    { name: 'fas fa-sync-alt', bg: cE.gradMango, text: "48-hour turnaround" },
  ]

  const createBullets = (sp, i) => {
    return (
      <div key={i} className={css(cE.bullet)}>
        <div className={css(cE.imgIconWrapper, cE.gradButton, sp.bg)}>
          <i className={`${css(cE.iconFix)} ${sp.name} fa-2x`} />
        </div>
        <div className={css(cT.bulletListText)}>{sp.text}</div>
      </div>
    )
  }

  return (
    <div className={css(cE.twoColumnLists)}>
      <div className={css(cE.bulletList)}>
        <div className={css(cL.wrapper)}>
          <div className={css(cT.bulletListTitle)}>What we provide...</div>
          <div className={css(cE.fourBoxArea)}>
            {features.map((pt, i) => { return createBullets(pt, i)})}
          </div>
        </div>
      </div>
      <div className={css(cE.bulletList, cE.bulletListLast)}>
        <div className={css(cL.wrapper)}>
          <div className={css(cT.bulletListTitle)}>...how you benefit.</div>
          <div className={css(cE.fourBoxArea)}>
            {points.map((pt, i) => { return createBullets(pt, i)})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesBenefits
