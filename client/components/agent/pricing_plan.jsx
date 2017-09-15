import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/pricing'
import { c } from '../../styles/helpers'
import cE from '../../styles/common_elements'
import PricingDetails from './pricing_details'


class PricingPlan extends Component {
  constructor(){
    super()

  }

  handleSelectedPlan(plan, evt){
    evt.stopPropagation()
    this.props.selectedPlan(plan)
  }


  getButtonColor(color){
    if(color === "blue"){
      return c.blue
    } else {
      return c.red
    }
  }

  render(){
    return (
      <div className={css(styles.plan)}>
        <PricingDetails planSpecifics={this.props.planSpecifics} />
        <div className={css(styles.buttonWrapper)}>
          <Link
            to={`/pricing/order/${this.props.planSpecifics.name}`}
            style={{ backgroundColor: this.getButtonColor(this.props.planSpecifics.color), alignSelf: 'flex-end' }}
            className={css(cE.callToAction)}
            onClick={ this.handleSelectedPlan.bind(this, this.props.planSpecifics.name) }
          >Order Now</Link>
      </div>
      </div>
    )
  }
}

export default PricingPlan
