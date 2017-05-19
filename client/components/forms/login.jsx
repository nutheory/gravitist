import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import TextField from 'material-ui/TextField'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'

class Login extends Component {

  constructor(){
    super()
    this.state = {
      email: "",
      password: ""
    }
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
        <Formsy.Form
          onSubmit={this.handleSubmit.bind(this)}
        >
          <fieldset className={css(layout.fieldPadding)}>
            <h4 className={css(style.sectionTitle)}>Login</h4>
            <div className={css(layout.singleColumn)}>
              <FormsyText
                hintText="Email"
                floatingLabelText="Email"
                name="email"
                value={this.state.email}
                onChange={e => this.setState({email: e.currentTarget.value})}
              />
            </div>
            <div className={css(layout.singleColumn)}>
              <FormsyText
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
            <RaisedButton
              type="submit"
              primary={ true }
              label="Login"
              fullWidth={true}
            />
          </fieldset>
        </Formsy.Form>
      </div>
    )
  }
}

export default Login
