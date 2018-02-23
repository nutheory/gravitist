// @flow
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { css } from 'aphrodite'
import { Link } from 'react-router-dom'
import Loading from '../../misc/loader'
import AddressMapper from '../../addresses/address_mapper'
import CreateOrder from '../../../mutations/create_order'
import Plans from '../../../utils/pricing_plans.json'
import rdr from '../styles/reorder'
import cE from '../../../styles/common_elements'
import cErr from '../../../styles/common_errors'

type Props = {
  submitOrder: Function
}

type State = {
  addressVerified: boolean,
  loading: boolean,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  lat?: string,
  lng?: string,
  errors: Array<String>
}

class Reorder extends Component<Props, State> {

  handleReturnedLocation: Function
  handleGQLErrors: Function
  submitOrder: Function

  constructor(props: Object){
    super(props)

    this.state ={
      addressVerified: false,
      loading: false,
      errors: []
    }

    this.handleReturnedLocation = this.handleReturnedLocation.bind(this)
    this.handleGQLErrors = this.handleGQLErrors.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
  }

  handleGQLErrors(err){
    err.graphQLErrors.map(error => {
      this.setState((prevState) => ({ errors: prevState.errors.concat(error.message) }))
    })
  }

  handleReturnedLocation({ address1, address2, city, state, zip, lat, lng }: Object){
    if (address1 && city && state && zip && lat && lng){
      this.setState({ address1, address2, city, state, zip, lat, lng, addressVerified: true })
    }
  }

  submitOrder(plan){
    if(plan && this.state.addressVerified){
      this.setState({ loading: !this.state.loading }, async () => {
        const resolved = await this.props.submitOrder({ plan, state: this.state }).catch(err => {
          this.handleGQLErrors(err)
        })
        const { data: { createOrder: { order } } } = resolved
      })
    }
  }

  render(){
    return(
      <div className="columns is-mobile is-centered">
        <div className="column is-three-fifths is-narrow">
          <div className="columns">
            <div className={`column ${css(rdr.pageTitle)}`}>Order a new filming</div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Address to film</label>
                <AddressMapper handleReturnedLocation={ this.handleReturnedLocation } />
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className={`notification is-danger ${css(cErr.areaHidden)}
                ${ this.state.errors.length > 0 ? css(cErr.area) : ""}`}>
                <h2 className={`${css(cErr.header)}`}>Please correct these errors</h2>
                { this.state.errors.map((err, i) => (
                  <div key={`error_${i}`} className={css(cErr.section)}>
                    <p className={`${css(cErr.text)}`}>{err}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="columns">
          { Plans.map(plan =>
            <div key={`plan_${plan.name}`} className={`column ${css(rdr.planOuter)}`}>
              <div className={`${css(rdr.plan, cE.areaBase, cE.blueObj)}`}>
                <div className={`${css(rdr.header)} columns`}>
                  <h3 className={`${css(rdr.planTitle)} column`}>{plan.title}</h3>
                  <h3 className={`${css(rdr.planPrice)} column is-narrow`}>${plan.price}</h3>
                </div>
                <div className={`${css(rdr.details)} columns`}>
                  <div className={`column`}>
                    <p className={css(rdr.desc)}>{plan.desc}</p>
                    <ul className={css(rdr.features)}>
                      {plan.features.map((feat, i) => {
                        return (
                          <li key={i} className={css(rdr.feature)}>
                            <i className={`${css(rdr.icon)} ${feat.icon}`} />
                            <p className={css(rdr.featureText)}>{feat.desc}</p>
                          </li> )})}
                    </ul>
                  </div>
                </div>
                <div className={css(rdr.buttonWrapper)}>
                  <a
                    onClick={this.submitOrder(plan)}
                    className={css(cE.ctaButton, cE[`cta${plan.color}`])}>
                    <span className={css(cE.ctaButtonOverlay)}></span>Order Now
                  </a>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(CreateOrder, {
    props: ({ ownProps, mutate }) => ({
      submitOrder: ({ state, plan }) => mutate({ variables: {
        input: {
          order: {
            status: "pending",
            plan: {
              id: plan.planId,
              name: plan.name,
              actualPrice: plan.actualPrice,
            },
            address: {
              address1: state.address1,
              address2: state.address2,
              city: state.city,
              state: state.state,
              zipCode: state.zip,
              lat: state.lat,
              lng: state.lng
            } }} } }) })
})(Reorder)
