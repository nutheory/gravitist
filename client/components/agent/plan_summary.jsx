import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/pricing'
import summary from './styles/summary'

const PlanSummary = (props) => {

  const getIcon = (icon, color) => {
    if ((icon === "check") && (color === "blue")){
      return require('../../assets/svg/iconCheckBlue.svg')
    } else if ((icon === "check") && (color === "red")){
      return require('../../assets/svg/iconCheckRed.svg')
    } else if ((icon === "plus") && (color === "blue")){
      return require('../../assets/svg/iconPlusBlue.svg')
    } else {
      return require('../../assets/svg/iconPlusRed.svg')
    }
  }

  const isSelected = (truthy) => {
    if(truthy){
      return <NavLink to="/pricing" className={css(styles.changeLink)}>Change Plan</NavLink>
    }
  }

  return (
    <div className={css(summary.container)}>
      <div className={css(summary.mainInfo)}>
        <h1 className={css(summary.planTitle)}>{props.planSpecifics.title}</h1>
        <h3 className={css(summary.planDesc)}>{props.planSpecifics.desc}</h3>
        <div className={css(summary.footer)}>
          <div className={css(summary.priceArea)}>
            <span className={css(summary.dollarSign)}>$</span>
            <span className={css(summary.price)}>{props.planSpecifics.price}</span>
            <span className={css(summary.cents)}>.00</span>
          </div>
          <div className={css(summary.change)}>{isSelected(props.selected)}</div>
        </div>
      </div>
      <div className={css(summary.featuresList)}>
        <ul className={css(styles.features)}>
          {props.planSpecifics.features.map((feat, i) => {
            return (
              <li key={i} className={css(styles.feature)}>
                <img
                  className={css(summary.icon)}
                  src={`/${getIcon(feat.icon, props.planSpecifics.color)}`}
                  alt={`${feat.icon} ${props.planSpecifics.color}`}
                />
                <p className={css(summary.featureDesc)}>{feat.desc}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default PlanSummary
