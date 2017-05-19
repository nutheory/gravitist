import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/pricing'
import layout from '../../../styles/layout'
import Colors from '../../../styles/colors'
import general from '../index/styles/general'
import PricingRender from './pricingRender'


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
      return Colors.blue
    } else {
      return Colors.red
    }
  }

  render(){
    return (
      <div className={css(styles.plan)}>
        <PricingRender planSpecifics={this.props.planSpecifics} />
        <div className={css(styles.buttonWrapper)}>
          <Link
            to={`/order/${this.props.planSpecifics.name}`}
            style={{ backgroundColor: this.getButtonColor(this.props.planSpecifics.color), alignSelf: 'flex-end' }}
            className={css(general.callToAction)}
            onClick={ this.handleSelectedPlan.bind(this, this.props.planSpecifics.name) }
          >Order Now</Link>
      </div>
      </div>
    )
  }
}

export default PricingPlan
