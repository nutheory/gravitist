// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import PlanSummary from './plan_summary'
import OrderForm from './order_form'
import odr from './styles/order'
import Plans from '../../../utils/pricing_plans.json'

type Props = {
  match: Object
}

type State = {
  selectedPlan: Object,
  latLng?: Array<string>,
}

class Order extends Component<Props, State> {

  updateMapInSummary: Function

  constructor(){
    super()

    this.state = {
      selectedPlan: {}
    }

    this.updateMapInSummary = this.updateMapInSummary.bind(this)
  }

  componentDidMount(){
    const choosenPlan = Plans.filter(p => p.name === this.props.match.params.plan ? p : null)
    this.setState({ selectedPlan: choosenPlan[0] }, (res) => {})
  }

  updateMapInSummary(latLng: Array<string>){
    this.setState({ latLng })
  }

  render(){
    if (this.state.selectedPlan.name){
      return (
        <div className={`${css(odr.container)} columns`}>
          <div className={`${css(odr.summary)} column`}>
            <PlanSummary selectedPlan={ this.state.selectedPlan } mapLatLng={ this.state.latLng } />
          </div>
          <div className={`${css(odr.mainArea)} column`}>
            <OrderForm
              {...this.props}
              selectedPlan={ this.state.selectedPlan }
              updateMapInSummary={ this.updateMapInSummary } />
          </div>
        </div>
      )
    } else { return (<div></div>) }
  }
}

export default Order
