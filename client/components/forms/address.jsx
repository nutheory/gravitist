import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib'
import MenuItem from 'material-ui/MenuItem'
import _ from 'lodash'
import States from '../../utils/states.json'

const states = []
_.each(States, (state, i) => {
  states.push(<MenuItem value={state.abbreviation} key={`${state.abbreviation}_${i}`} primaryText={state.abbreviation} />)
})

class Address extends Component {
  constructor(){
    super()
    this.state = {
      geoState: "Select"
    }
  }

  handleStateSelect(e, i, val){
    console.log('this2', this)
    this.setState({ geoState: val })
  }

  render(){
    return(
      <fieldset>
        <div>
          <FormsyText
            name="address.address1"
            hintText="Address"
            floatingLabelText="Address"
          />
        </div>
        <div>
          <FormsyText
            name="address.address2"
            hintText="Address 2"
            floatingLabelText="Address 2"
          />
        </div>
        <div>
          <div>
            <FormsyText
              name="address.city"
              hintText="City"
              floatingLabelText="City"
            />
          </div>
          <div>
            <FormsySelect
              name="address.state"
              value={this.state.geoState}
              onChange={this.handleStateSelect.bind(this)}
              hintText="State"
              floatingLabelText="State"
              maxHeight={200}
            >
              {states}
            </FormsySelect>

          </div>
          <div>
            <FormsyText
              name="address.zip"
              hintText="Zip Code"
              floatingLabelText="Zip Code"
            />
          </div>
        </div>
      </fieldset>
    )
  }
}

export default Address
