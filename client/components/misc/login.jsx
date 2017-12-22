import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Input, Button, Form } from 'semantic-ui-react'
import { browserHistory, withRouter, Link } from 'react-router-dom'
import LoginUser from '../../mutations/login'
// import CurrentUserQuery from '../../queries/current_user'
import { StyleSheet, css } from 'aphrodite'
import lg from './styles/login'


class Login extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context){
    super(props, context)
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.runMutation = this.runMutation.bind(this)
  }

  async runMutation(){
    const resolved = await this.props.loginUser({ variables: {
      input: {
        email: this.state.email,
        password: this.state.password
        }
      }
    })
    const { data } = resolved
    data.loginUser.user ? this.redirectOnSuccess(data.loginUser) : this.displayErrorMessage()
  }

  redirectOnSuccess(res){
    console.log("USER", res.auth.token)
    localStorage.setItem('hf_auth_header_token', res.auth.token)
    console.log("LOC", localStorage.getItem('hf_auth_header_token'))
    switch(res.user.type) {
    case "agent": this.context.router.history.push('/dashboard'); break;
    case "pilot": this.context.router.history.push('/open-missions'); break;
    case "editor": this.context.router.history.push('/open-missions'); break;
    case "admin": this.context.router.history.push('/open-missions'); break;
    default: this.context.router.history.push('/')
    }
  }

  displayErrorMessage(){

  }

  handleChange(e){
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log("go")
    this.runMutation()
  }

  render(){
    const { email, password } = this.state
    return(
      <div className={css(lg.innerContainer)}>
        <div>
          <Link className={css(lg.logo)} to="/">HOMEFILMING</Link>
        </div>
        <div className={css(lg.formArea)}>
          <p>Log in to HomeFilming</p>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control has-icons-left">
                <input
                  className="input is-medium"
                  name="email"
                  value={email}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Email" />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-left">
                <input
                  className="input is-medium"
                  name="password"
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                  placeholder="Password" />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
              </div>
            </div>
            <button className={`${css(lg.button)} button`}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default graphql(LoginUser, {name: 'loginUser'})(Login)
