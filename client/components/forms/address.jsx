import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib'
import MenuItem from 'material-ui/MenuItem'
import _ from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'
import States from '../../utils/states.json'

const states = []
_.each(States, (state, i) => {
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

  componentDidMount(){
    this.addressCollection = this.props.addressCollection
  }

  handleAddressChange(evt){
    this.setState({address: evt.target.value}, (res) => {
      this.addressCollection(this.state)
    })
  }

  handleAddress2Change(){
    this.setState({address2: evt.target.value}, (res) => {
      this.addressCollection(this.state)
    })
  }

  handleCityChange(){

  }

  handleZipChange(){

  }

  handleStateSelect(evt, i){
    this.setState({ state: evt.target.value })
  }

  render(){
    return(
      <div>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="address.address1"
              className={css(style.textfieldFullSize)}
              onChange={this.handleAddressChange}
              hintText="Address"
              floatingLabelText="Address"
            />
          </div>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="address.city"
              className={css(style.textfieldFullSize)}
              onChange={this.handleCityChange}
              hintText="City"
              floatingLabelText="City"
            />
          </div>
        </div>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="address.address2"
              className={css(style.textfieldFullSize)}
              onChange={this.handleAddress2Change}
              hintText="Address 2"
              floatingLabelText="Address 2"
            />
          </div>
          <div className={css(layout.multiColumnEvenSize, style.addressSplitSection)}>
            <div className={css(style.addressState)}>
              <FormsySelect
                name="address.state"
                value={this.state.state}
                onChange={this.handleStateSelect}
                className={css(style.addressSelect)}
                hintText="State"
                floatingLabelText="State"
                maxHeight={200}
              >
                {states}
              </FormsySelect>
            </div>
            <div className={css(style.addressZip)}>
              <FormsyText
                name="address.zip"
                hintText="Zip Code"
                className={css(style.textfieldFullSize)}
                onChange={this.handleZipChange}
                floatingLabelText="Zip Code"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Address
