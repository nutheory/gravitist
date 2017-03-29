import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/auth'

class Login extends Component {

  constructor(){
    super()
  }

  componentDidMount(){

  }

  handleSubmit(e){

  }

  render(){
    return(
      <div id="LoginComponent" className={css(styles.container)}>
        <h2>Login</h2>
        <form id="AuthForm" onSubmit={this.handleSubmit()}>
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

export default Login
