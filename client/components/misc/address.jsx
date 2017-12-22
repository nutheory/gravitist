import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'

import { MenuItem } from 'material-ui/Menu'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'
import States from '../../utils/states.json'
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator'

const states = []
States.map((state, i) => {
  states.push(<MenuItem value={state.abbreviation} key={`${state.abbreviation}_${i}`} primaryText={state.abbreviation} />)
})

class Address extends Component {
  constructor(){
    super()
    this.state = {
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: ""
    }

    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAddress2Change = this.handleAddress2Change.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleStateSelect = this.handleStateSelect.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
  }

  handleAddressChange(evt){
    this.setState({address: evt.target.value}, (res) => {
      this.props.addressState(this.state)
    })
  }

  handleAddress2Change(evt){
    this.setState({address2: evt.target.value}, (res) => {
      this.props.addressState(this.state)
    })
  }

  handleCityChange(evt){
    this.setState({city: evt.target.value}, (res) => {
      this.props.addressState(this.state)
    })
  }

  handleZipChange(evt){
    this.setState({zip: evt.target.value}, (res) => {
      this.props.addressState(this.state)
    })
  }

  handleStateSelect(evt, key, payload){
    this.setState({ state: key })
  }

  render(){
    return(
      <div>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <TextValidator
              name="address.address1"
              validations={{
                minLength: 2
              }}
              required={true}
              // validationError="Required field"
              className={css(style.textfieldFullSize)}
              onChange={this.handleAddressChange}
              hintText="Address"
              label="Address"
            />
          </div>
          <div className={css(layout.multiColumnEvenSize)}>
            <TextValidator
              name="address.city"
              validations={{
                minLength: 2
              }}
              required={true}
              // validationError="Required field"
              className={css(style.textfieldFullSize)}
              onChange={this.handleCityChange}
              hintText="City"
              label="City"
            />
          </div>
        </div>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <TextValidator
              name="address.address2"
              className={css(style.textfieldFullSize)}
              onChange={this.handleAddress2Change}
              hintText="Address 2"
              label="Address 2"
            />
          </div>
          <div className={css(layout.multiColumnEvenSize, style.addressSplitSection)}>
            <div className={css(style.addressState)}>
              <SelectValidator
                name="address.state"
                validations={{
                  minLength: 2
                }}
                required={true}
                // validationError="Required field"
                value={this.state.state}
                onChange={this.handleStateSelect}
                className={css(style.addressSelect)}
                hintText="State"
                label="State"
                maxHeight={200}
              >
                {states}
              </SelectValidator>
            </div>
            <div className={css(style.addressZip)}>
              <TextValidator
                name="address.zip"
                validations={{
                  minLength: 5
                }}
                required={true}
                // validationError="Required field"
                hintText="Zip Code"
                className={css(style.textfieldFullSize)}
                onChange={this.handleZipChange}
                label="Zip Code"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Address
