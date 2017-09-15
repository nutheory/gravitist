import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib'
import { StyleSheet, css } from 'aphrodite'
import cF from '../../../styles/common_forms'

const radiuses = []
_.each([10, 20, 30, 40, 50], (rad, i) => {
  radiuses.push(<MenuItem value={rad} key={`radius_${rad.toString()}`} primaryText={`${rad.toString()} Miles`} />)
})

class PilotInfo extends Component {
  constructor(){
    super()
    this.state = {
      zip: "",
      radius: "",
      routing: "",
      account: ""
    }

    this.handleZipChange = this.handleZipChange.bind(this)
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.handleRoutingChange = this.handleRoutingChange.bind(this)
    this.handleAccountChange = this.handleAccountChange.bind(this)
  }

  handleZipChange(){

  }

  handleRadiusChange(){

  }

  handleRoutingChange(){

  }

  handleAccountChange(){

  }

  render(){
    return(
      <div>
        <div className={css(cF.row)}>
          <div className={css(cF.area)}>
            <FormsyText
              name="user.zip"
              validations={{
                minLength: 5
              }}
              required={true}
              validationError="Required field"
              onChange={this.handleZipChange}
              value={this.state.zip}
              className={css(cF.element)}
              floatingLabelText="Zip Code"
            />
          </div>
          <div className={css(cF.area)}>
            <FormsySelect
              name="user.radius"
              required={true}
              validationError="This is not a valid email"
              onChange={this.handleRadiusChange}
              value={this.state.radius}
              className={css(cF.element)}
              floatingLabelText="Filming Radius"
            >
              {radiuses}
            </FormsySelect>
          </div>
        </div>
        <div className={css(cF.row)}>
          <div className={css(cF.area)}>
            <FormsyText
              name="user.bank_router"
              validations={{
                minLength: 2
              }}
              required={true}
              validationError="Required field"
              onChange={this.handleRoutingChange}
              value={this.state.routing}
              className={css(cF.element)}
              floatingLabelText="Routing Number"
            />
          </div>
          <div className={css(cF.area)}>
            <FormsyText
              name="user.bank_account"
              validations={{
                minLength: 2
              }}
              required={true}
              validationError="Required field"
              onChange={this.handleAccountChange}
              value={this.state.account}
              className={css(cF.element)}
              floatingLabelText="Account Number"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PilotInfo
