// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import prc from './styles/pricing'
import cT from '../../../styles/common_text'
import cL from '../../../styles/common_layout'
import { sortBy, prop } from 'ramda'
import PricingPlan from './pricing_plan'
import Plans from '../../../utils/pricing_plans.json'
import Header from '../header'

const sortedPlans = sortBy(prop('planId'))(Plans)
const plans = []
sortedPlans.map((plan, i) => plans.push(plan))

type Props = {
}

type State = {
  selectedPlan: string
}

class PricingList extends Component<Props, State> {

  selectedPlan: Function

  constructor(){
    super()
    this.state = {
      selectedPlan: ""
    }

    this.selectedPlan = this.selectedPlan.bind(this)
  }

  selectedPlan(selectedPlan: string){
    this.setState({ selectedPlan }, (res) => {

    })
  }

  render(){
    return(
      <div id="pricingList" className={css(prc.container)}>
        <div className={css(cT.bigTitle)}>Get Started by Choosing a Plan!</div>
        <div className={`${css(prc.planList)} columns`}>
          { plans.map( plan => <div style={{display: 'flex', flex: 1 }} key={plan.name}><PricingPlan planSpecifics={plan} selectedPlan={this.selectedPlan} /></div> )}
        </div>
        <p className={css(prc.contactFooter)}>Alternatively, contact us at <a href="mailto:info@homefilming.com">info@homefilming.com</a> or <a href="tel:1-800-000-0000">1-800-000-0000</a> for your free consultation
to find out just how we can help your business grow the smart way!</p>
      </div>
    )
  }
}

export default PricingList
