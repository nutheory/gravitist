import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Signup extends Component {

  constructor(){
    super()
  }

  componentDidMount(){

  }

  handleSubmit(e){

  }

  render(){
    return(
      <div id="SignupComponent">
        <h2>Pilot Signup</h2>
        <form id="AuthForm" onSubmit={this.handleSubmit(this)}>
          <fieldset>
            <div>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
              />
            </div>
            <div>
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
              />
            </div>
          </fieldset>
          <fieldset>
            <RaisedButton label="Login" fullWidth={true} />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Signup
