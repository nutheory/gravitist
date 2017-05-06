import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'

class Login extends Component {

  constructor(){
    super()
    this.state = {email: '', password: ''}
  }

  componentDidMount(){

  }

  handleSubmit(e){
    e.preventDefault()
    // this.props.mutate({
    //   variables: ({ email: this.state.email, password: this.state.password})
    // }).catch((res) => {
    //   console.log("Error ", res.graphQLErrors[0].message)
    // }).then((res) => {
    //   if (res){
    //     console.log("res.data.login.token", res.data.login.token)
    //     localStorage.setItem('hf_auth_header_token', res.data.login.token)
    //   }
    // })
  }

  render(){
    return(
      <div id="LoginComponent">
        <h2>Login</h2>
        <form id="AuthForm" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                name="email"
                value={this.state.email}
                onChange={e => this.setState({email: e.currentTarget.value})}
              />
            </div>
            <div>
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({password: e.currentTarget.value})}
              />
            </div>
          </fieldset>
          <fieldset>
            <RaisedButton type="submit" label="Login" fullWidth={true} />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Login
