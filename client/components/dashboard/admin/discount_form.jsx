// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import PricingPlans from '../../../utils/pricing_plans.json'
import CreateDiscount from '../../../mutations/create_discount'
import GetDiscounts from '../../../queries/discount_collections'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  submitDiscount: Function
}

type State = {
  startsDate: Object,
  endsDate: Object,
  maxUsageCount?: number,
  dateChanged: boolean,
  planOpen: boolean,
  appliesTo: string,
  amount?: string,
  code?: string,
}

class DiscountForm extends Component<Props, State> {

  toggleDropdownHandler: Function
  handlePlanChange: Function
  handleDateChange: Function
  handleInputChange: Function
  handleSubmit: Function

  constructor(props: Object){
    super(props)

    this.state ={
      startsDate: Moment(),
      endsDate: Moment().add(1, 'M'),
      dateChanged: false,
      planOpen: false,
      appliesTo: 'all'
    }

    this.toggleDropdownHandler = this.toggleDropdownHandler.bind(this)
    this.handlePlanChange = this.handlePlanChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleDropdownHandler(){
    this.setState({ planOpen: !this.state.planOpen })
  }

  handleDateChange(name: string, date: Object) {
    this.setState({ [name]: date, dateChanged: true })
  }

  handlePlanChange(e: SyntheticEvent<*>){
    this.setState({ appliesTo: e.currentTarget.getAttribute('plan') })
  }

  handleInputChange(e: SyntheticEvent<*>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  async handleSubmit(){
    const amountValid = this.state.amount ? ['.', '%'].some(char => this.state.amount ? this.state.amount.includes(char) : null) : false
    const datesValid = this.state.dateChanged ? this.state.endsDate.isAfter(this.state.startsDate) : true
    if(this.state.code && amountValid && datesValid){
      const resolved = await this.props.submitDiscount({
        appliesTo: this.state.appliesTo,
        amount: this.state.amount,
        code: this.state.code,
        startsAt: this.state.dateChanged ? this.state.startsDate : null,
        endsAt: this.state.dateChanged ? this.state.endsDate : null,
        maxUsageCount: this.state.maxUsageCount
      })
      console.log('resolved', resolved)
    }
  }

  render(){
    return(
      <div className="bg-white rounded shadow p-4 w-full">
        <h3 className="font-bold">Add a discount</h3>
        <div className="flex flex-wrap -mx-2 mt-4">
          <div className="px-2 flex-1 sm:w-1/2 md:w-1/3 mb-4 lg:w-auto lg:mb-auto">
            <div className="text-xs">Code</div>
            <input
              type="text"
              className="input"
              name="code"
              placeholder="ex. happy_holidays"
              onChange={this.handleInputChange} />
          </div>
          <div className="px-2 w-48 sm:w-1/2 md:w-1/3 mb-4 lg:w-auto lg:mb-auto">
            <div className="text-xs">Amount</div>
            <input
              type="text"
              className="input"
              name="amount"
              placeholder="ex. 10% or 10.00"
              onChange={this.handleInputChange} />
          </div>
          <div className="px-2 sm:w-1/2 md:w-1/3 mb-4 lg:w-auto lg:mb-auto">
            <div className="text-xs">Starts at</div>
            <DatePicker
              className="input w-full"
              name="startsDate"
              selected={this.state.startsDate}
              onChange={this.handleDateChange.bind(this, 'startsDate')} />
          </div>
          <div className="px-2 sm:w-1/2 md:w-1/3 mb-4 lg:w-auto lg:mb-auto">
            <div className="text-xs">Ends at</div>
            <DatePicker
              className="input w-full"
              name="endsDate"
              selected={this.state.endsDate}
              onChange={this.handleDateChange.bind(this, 'endsDate')} />
          </div>
          <div className="px-2 w-32">
            <div className="text-xs">Number of offerings</div>
            <input
              type="number"
              className="input"
              name="maxUsageCount"
              placeholder="5"
              onChange={this.handleInputChange} />
          </div>
          <div className="px-2 sm:w-1/2 md:w-1/3 mb-4 lg:w-auto lg:mb-auto">
            <div className="text-xs">Apply to plan</div>
            <div className="inline-block">
            <div className={`dropdown relative ${ this.state.planOpen ? 'is-active' : '' }`}>
                <div className="dropdown-trigger hover:cursor-pointer">
                  <button
                    onClick={this.toggleDropdownHandler}
                    className="select-faker"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu">
                    <span className="capitalize">{ `${ this.state.appliesTo === 'all' ? 'All plans' : this.state.appliesTo }` }</span>
                    <span className="inline-block ml-6">
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className={`dropdown-menu ${ this.state.planOpen ? 'block' : 'hidden' }`} id="dropdown-menu" role="menu">
                  <div className="p-2 flex flex-wrap bg-white border border-grey rounded">
                    { PricingPlans.map((pp, i) =>
                      <a
                        plan={pp.name}
                        proper={pp.title}
                        onClick={this.handlePlanChange}
                        className="w-full block px-2 py-1 hover:cursor-pointer"
                        key={`plan_${pp.name}`}>
                        {pp.title}</a>
                    ) }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 px-2">
            <button
              onClick={ this.handleSubmit }
              className="button-green">
              Add discount
              <span className="action-button-overlay"></span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(CreateDiscount, {
  props: ({ ownProps, mutate }) => ({
    submitDiscount: (props) => mutate({
      variables: { input: props },
      refetchQueries: [{
        query: GetDiscounts,
        variables: { } }]
    }) })
})(DiscountForm)
