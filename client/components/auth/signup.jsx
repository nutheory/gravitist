import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/auth'

class Signup extends Component {

  constructor(){
    super()
    this.onSubmit = this.handleSubmit.bind(this)
  }



  handleSubmit(e){
    console.log("boomhjgfjhgj")
    e.preventDefault()
    console.log("boom")
  }

  render(){
    return(
      <div id="SignupComponent">
        <h2>Signup</h2>
        <form id="AuthForm" onSubmit={this.onSubmit}>
          <fieldset>
            <div>
              <TextField
                id="name"
                name="name"
                hintText="Name"
                floatingLabelText="Name"
              />
            </div>
            <div>
              <TextField
                id="email"
                name="email"
                hintText="Email"
                floatingLabelText="Email"
              />
            </div>
            <div>
              <TextField
                id="password"
                name="password"
                hintText="Password"
                floatingLabelText="Password"
                type="password"
              />
            </div>
            </fieldset>
            <fieldset>
            <div>
              <TextField
                id="phone"
                name="phone"
                hintText="Phone"
                floatingLabelText="Phone"
              />
            </div>
            <div>
              <TextField
                id="company"
                name="company"
                hintText="Company Name"
                floatingLabelText="Company Name"
              />
            </div>
            <div>
              <TextField
                id="license"
                name="license"
                hintText="License"
                floatingLabelText="License"
              />
            </div>
          </fieldset>
          <fieldset>
            <RaisedButton label="Signup" fullWidth={true} />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Signup
