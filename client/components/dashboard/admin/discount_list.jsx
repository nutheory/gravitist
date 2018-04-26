// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import { humanize, dateShort } from '../../../utils/helpers'
import GetDiscounts from '../../../queries/discount_collections'

type Props = {
  data: Function
}

type State = {

}

class DiscountList extends Component<Props, State> {

  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state ={
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(){}

  render(){
    const { loading, getDiscounts } = this.props.data
    if(loading){return (<div>Loading</div>)}
    return(
      <div className="flex flex-wrap mb-6 md:-mx-4">
        { getDiscounts.discounts.map(dct => (
          <div className="p-4 w-1/4" key={`discount_${dct.id}`}>
            <div className="flex flex-col h-full bg-white rounded shadow p-4">
              <div className="flex-1">
                <h4 className="text-center mb-2">{dct.code}</h4>
                <p className="text-lg text-center mb-4">{dct.amount}</p>
                <p className="text-xs font-bold text-center mb-1">Duration</p>
                { dct.startsAt || dct.endsAt ?
                  <div className="mt-4">
                    { dct.startsAt ? <div className="text-xs text-center">{dateShort(dct.startsAt)}</div>
                    : <div className="text-xs text-center">no start date</div>}
                    <div className="text-xs text-center"> - </div>
                    { dct.endsAt ? <div className="text-xs text-center">{dateShort(dct.endsAt)}</div>
                    : <div className="text-xs text-center">continuous</div>}
                  </div>
                : <p className="text-sm text-center">Continuous</p> }
                { dct.appliesTo && dct.appliesTo !== 'all'  ?
                  <div className="mt-4">
                    <p className="text-xs font-bold text-center mb-1">Apllies to plan</p>
                    <div className="text-xs text-center">{humanize(dct.appliesTo)}</div>
                  </div>
                : null }
                { dct.maxUsageCount ?
                  <div className="mt-4">
                    <p className="text-xs font-bold text-center mb-1">Availability</p>
                    <div className="text-xs text-center">{dct.usageCount} of {dct.maxUsageCount}</div>
                  </div>
                : null }
              </div>
              <div className="flex self-end leading-normal mt-4">
                <div className=" flex-1 text-xs text-right">
                  <Link
                    className="inline-block text-blue-darker border border-blue-darker py-1 px-6 rounded-full"
                    to={`/admin/orders/discountId/${dct.id}`}>View orders</Link>
                </div>
              </div>
            </div>
          </div>
        )) }
      </div>
    )
  }
}

export default graphql(GetDiscounts, {
  options: (props) => ({ variables: { input: { } } })
})(DiscountList)
