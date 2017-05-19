import React, { Component } from 'react'
import { css } from 'aphrodite'
import _ from 'lodash'
import OrderSignup from '../../forms/agentSignup'
import PaymentForm from '../../forms/agentPayment'
import AddressMapper from '../../forms/addressMapper'
import PricingRender from './pricingRender'
import order from './styles/order'
import Plans from '../../../utils/pricingPlans.json'


class AgentOrder extends Component {
  constructor(){
    super()
    this.state = {
      selectedPlan: ""
    }
  }

  componentDidMount(){
    // console.log('props', this.props.match.params)
    const choosenPlan = _.find(Plans, {name: this.props.match.params.plan})
    // const choosenPlan = _.find(Plans, {name: "basic"})
    console.log('choosenPlan', choosenPlan)
    this.setState({ selectedPlan: choosenPlan })
  }



  render(){
    if (this.state.selectedPlan){
      return (
        <div className={css(order.container)}>
          <h1 className={css(order.sectionHeader)}>Let get started...</h1>
          <div className={css(order.head)}>
            <div className={css(order.plan)}>
              <PricingRender planSpecifics={this.state.selectedPlan} selected={true} />
            </div>
            <div className={css(order.addressMapper)}>
              <AddressMapper />
            </div>
          </div>
          <div className={css(order.main)}>
            <div className={css(order.signup)}>
              <OrderSignup />
            </div>
            <div className={css(order.payment)}>
              <PaymentForm />
            </div>
          </div>
          <div className={css(order.footer)}>

          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default AgentOrder
