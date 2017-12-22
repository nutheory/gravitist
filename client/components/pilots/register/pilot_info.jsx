import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import cF from '../../../styles/common_forms'
const radiusOpts = [10, 20, 30, 40, 50]
const radiusList = []

class PilotInfo extends Component {
  constructor(){
    super()
    this.state = {
      zip: "",
      radius: "",
      routing: "",
      account: ""
    }
    // radiusOpts.map((rad, i) =>
      // radiusList.push(<MenuItem value={rad} key={`radius_${rad.toString()}`}>
      //   {`${rad.toString()} Miles`}</MenuItem>)
    // )
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
            {/* <TextValidator
              name="user.zip"
              validations={{
                minLength: 5
              }}
              required={true}
              // validationError="Required field"
              onChange={this.handleZipChange}
              value={this.state.zip}
              className={css(cF.element)}
              label="Zip Code"
            /> */}
          </div>
          <div className={css(cF.area)}>
            {/* <Select
              name="user.radius"
              validationError="This is not a valid email"
              onChange={this.handleRadiusChange}
              value={this.state.radius}
              className={css(cF.element)}
              label="Filming Radius"
            >
              {radiusList}
            </Select> */}
          </div>
        </div>
        <div className={css(cF.row)}>
          <div className={css(cF.area)}>
            {/* <TextValidator
              name="user.bank_router"
              validations={{
                minLength: 2
              }}
              required={true}
              // validationError="Required field"
              onChange={this.handleRoutingChange}
              value={this.state.routing}
              className={css(cF.element)}
              label="Routing Number"
            /> */}
          </div>
          <div className={css(cF.area)}>
            {/* <TextValidator
              name="user.bank_account"
              validations={{
                minLength: 2
              }}
              required={true}
              // validationError="Required field"
              onChange={this.handleAccountChange}
              value={this.state.account}
              className={css(cF.element)}
              label="Account Number"
            /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default PilotInfo
