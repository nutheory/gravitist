import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { browserHistory, withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import LoginUser from '../../mutations/login'
import CurrentUserQuery from '../../queries/current_user'
import { StyleSheet, css } from 'aphrodite'
import lg from './styles/login'

class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props, context){
    super(props, context)
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.runMutation = this.runMutation.bind(this)
  }

  async runMutation(){
    const resolved = await this.props.loginUser({ variables: {
      input: {
        email: this.state.email,
        password: this.state.password
        }
      }, refetchQueries: [{ query: CurrentUserQuery }]
    })
    console.log("RUN", resolved)
    const { data } = resolved
    data.login.email ? this.redirectOnSuccess(data.login) : this.displayErrorMessage()
  }

  redirectOnSuccess(user){
    console.log("USER", user)
    localStorage.setItem('hf_auth_header_token', user.token)
    switch(user.type) {
    case "agent": this.context.router.history.push('/dashboard'); break;
    case "pilot": this.context.router.history.push('/open-missions'); break;
    case "editor": this.context.router.history.push('/open-missions'); break;
    case "admin": this.context.router.history.push('/open-missions'); break;
    default: this.context.router.history.push('/')
    }
  }

  displayErrorMessage(){

  }

  handleSubmit(e){
    e.preventDefault()
    this.runMutation()
  }

  render(){
    return(
      <div className={css(lg.container)}>
        <Formsy.Form>
          <div className={css(lg.innerContainer)}>
            <p className={css(lg.text)}>Please login with your email and password.</p>
            <div className={css(lg.row)}>
              <FormsyText
                floatingLabelText="Email"
                name="email"
                value={this.state.email}
                onChange={e => this.setState({email: e.currentTarget.value})}
              />
            </div>
            <div className={css(lg.row)}>
              <FormsyText
                floatingLabelText="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({password: e.currentTarget.value})}
              />
            </div>
          </div>
          <div className={css(lg.row)}>
            <RaisedButton
              label="Login"
              fullWidth={true}
              primary={true}
              onClick={this.handleSubmit}
            />
          </div>
        </Formsy.Form>
      </div>
    )
  }
}

export default graphql(LoginUser, {name: 'loginUser'})(Login)
