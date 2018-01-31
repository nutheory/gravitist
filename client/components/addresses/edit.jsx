// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import States from '../../utils/states.json'

type Props = {
  address: Object,
  returnAddress: Function
}

type State = {
  state: string,
  address1: string,
  address2: string,
  city: string,
  zipCode: string,
  lat: string,
  lng: string
}

class AddressEdit extends Component<Props, State> {

  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state ={
      address1: props.address.address1,
      address2: props.address.address2,
      city: props.address.city,
      state: props.address.state,
      zipCode: props.address.zipCode,
      lat: props.address.lat,
      lng: props.address.lng,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, function(){
      console.log('address state', this.state)
      this.props.returnAddress(this.state)
    })
  }

  render(){
    const address = this.props.address
    return(
      <div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="text"
              placeholder="Address"
              name="address1"
              onChange={ this.handleInputChange }
              defaultValue={ address.address1 } />
            <span className="icon is-small is-left">
              <i className="fa fa-home"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={ this.handleInputChange }
                  defaultValue={ address.city } />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <p className="control">
                <span className="select is-fullwidth">
                  <select
                    onChange={ this.handleInputChange }
                    name="state"
                    defaultValue={ this.state.state }>
                    <option>State</option>
                    { States.map((state, i) => <option value={state.abbreviation} key={`${state.abbreviation}_${i}`}>{state.abbreviation}</option> )}
                  </select>
                </span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Zip code"
                  name="zipCode"
                  onChange={ this.handleInputChange }
                  defaultValue={address.zipCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddressEdit
