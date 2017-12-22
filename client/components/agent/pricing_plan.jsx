// @flow
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/pricing'
import cE from '../../styles/common_elements'

type Props = {
  selectedPlan: Function,
  planSpecifics: Object,
  selected: boolean
}

class PricingPlan extends Component<Props> {

  handleSelectedPlan: Function
  isSelected: Function

  constructor(){
    super()
    this.handleSelectedPlan = this.handleSelectedPlan.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  handleSelectedPlan(e: SyntheticEvent<*>){
    e.stopPropagation()
    this.props.selectedPlan(this.props.planSpecifics.name)
  }

  isSelected(truthy: boolean){
    if(truthy){
      return <Link to="/pricing" className={css(styles.changeLink)}>Change Plan</Link>
    }
  }

  render(){
    return (
      <div className={`${css(styles.plan)} column is-half`}>
        <div className={css(styles.header)}>
          <h3 className={css(styles.planTitle)}>{this.props.planSpecifics.title} {this.isSelected(this.props.selected)}</h3>
          <h3 className={css(styles.planPrice)}>${this.props.planSpecifics.price}</h3>
        </div>
        <div className={css(styles.details)}>
          <h4 className={css(styles.desc)}>{this.props.planSpecifics.desc}</h4>
          <ul className={css(styles.features)}>
            {this.props.planSpecifics.features.map((feat, i) => {
              return (
                <li key={i} className={css(styles.feature)}>
                  <i className={`${css(styles.icon)} fa fa-${feat.icon} fa-2x`} />
                  <p className={css(styles.featureDesc)}>{feat.desc}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={css(styles.buttonWrapper)}>
          <Link
            to={`/pricing/order/${this.props.planSpecifics.name}`}
            className={css(cE.ctaButton, cE[`cta${this.props.planSpecifics.color}`])}>
            <span className={css(cE.ctaButtonOverlay)}></span>Order Now
          </Link>
        </div>
      </div>
    )
  }
}

export default PricingPlan
