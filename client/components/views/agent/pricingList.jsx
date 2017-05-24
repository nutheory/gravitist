import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import pricing from './styles/pricing'
import cT from '../../../styles/commonText'
import _ from 'lodash'
import PricingPlan from './pricingPlan'
import Plans from '../../../utils/pricingPlans.json'

const sortedPlans = _.sortBy(Plans, ['order'])
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
      <div id="pricingList" className={css(pricing.container)}>
        <h1 className={css(cT.sectionHeader)}>Our pricing</h1>
        <div className={css(pricing.planList)}>
          { plans.map( plan => <PricingPlan key={plan.name} planSpecifics={plan} selectedPlan={this.selectedPlan} /> )}
        </div>
        <p className={css(pricing.contactFooter)}>Alternatively, contact us at <a href="mailto:info@homefilming.com">info@homefilming.com</a> or <a href="tel:1-800-000-0000">1-800-000-0000</a> for your free consultation
to find out just how we can help your business grow the smart way!</p>
      </div>
    )
  }
}

export default PricingList
