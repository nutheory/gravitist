import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import prc from './styles/pricing'
import cT from '../../styles/common_text'
import cL from '../../styles/common_layout'
import _ from 'lodash'
import PricingPlan from './pricing_plan'
import Plans from '../../utils/pricing_plans.json'
import Header from '../misc/header'

const sortedPlans = _.sortBy(Plans, ['planId'])
const plans = []
_.each(sortedPlans, (plan, i) => {
  plans.push(plan)
})

class PricingList extends Component {
  constructor(){
    super()
    this.state = {
      selectedPlan: ""
    }
    this.selectedPlan = this.selectedPlan.bind(this)
  }

  selectedPlan(selectedPlan){
    this.setState({ selectedPlan }, (res) => {
      this.props.handleNext(selectedPlan)
    })
  }

  render(){
    return(
      <div id="pricingList" className={css(prc.container)}>
        <div className={css(cT.bigTitle)}>Get Started by Choosing a Plan!</div>
        <div className={`${css(prc.planList)} columns`}>
          { plans.map( plan => <PricingPlan key={plan.name} planSpecifics={plan} selectedPlan={this.selectedPlan} /> )}
        </div>
        <p className={css(prc.contactFooter)}>Alternatively, contact us at <a href="mailto:info@homefilming.com">info@homefilming.com</a> or <a href="tel:1-800-000-0000">1-800-000-0000</a> for your free consultation
to find out just how we can help your business grow the smart way!</p>
      </div>
    )
  }
}

export default PricingList
