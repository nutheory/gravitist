// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Input, Button, Form } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import LoginUser from '../../mutations/login'
import { css } from 'aphrodite'
import lg from './styles/login'

type Props = {
  history: Object,
  loginUser: Function
}

type State = {
  email: string,
  password: string,
  loggedIn: boolean,
  errors: Array<Object>
}

class Login extends Component<Props, State> {
  handleChange: Function
  handleSubmit: Function
  runMutation: Function

  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      errors: []
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
      }})
      .then(({ data }) => { data.loginUser.user ? this.redirectOnSuccess(data.loginUser) : null })
      .catch(err => { this.handleGQLErrors(err) })
  }

  redirectOnSuccess(res){
    localStorage.setItem('hf_auth_header_token', res.auth.token)
    switch(res.user.type) {
    case "agent": this.props.history.push('/dashboard'); break;
    case "pilot": this.props.history.push('/dashboard'); break;
    case "editor": this.props.history.push('/open-missions'); break;
    case "admin": this.props.history.push('/open-missions'); break;
    default: this.props.history.push('/')
    }
  }

  handleGQLErrors(err){
    err.graphQLErrors.map((error) => {
      if(error.name === "NotFound"){
        this.setState((prevState) => ({ errors: prevState.errors.concat({
          message: "Email could not be found for authenication." }) }) )
      } else {
        this.setState((prevState) => ({ errors: prevState.errors.concat({
          message: error.message.split(': ')[1] }) }) )
      }
    })
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
          <p className={`subtitle is-4`}>Log in to HomeFilming</p>
          { this.state.errors.length > 0 ?
            <div className={`message is-danger`}>
              <div className={`message-body`}>
                <ul>
                  { this.state.errors.map((err, i) => <li key={`error_${i}`}>{ err.message }</li>) }
                </ul>
              </div>
            </div>
          : null }
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
