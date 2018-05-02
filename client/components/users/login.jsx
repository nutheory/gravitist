// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import LoginUser from '../../mutations/login'

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
          message: "Authenication failed." }) }) )
      }
    })
  }

  handleChange(e){
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({ errors: [] })
    this.runMutation()
  }

  render(){
    const { email, password } = this.state
    return(
      <div className="login-container mt-20">
        <div className="login-wrapper">
          <div className="flex">
            <div className="flex-1"></div>
            <Link className="w-48 h-6 block" to="/"><img src={`/${require('../../assets/images/hf_logo_dark@2x.png')}`} /></Link>
          </div>
          <div className="text-right text-sm font-bold pb-1">Login</div>
          <div className="w-full bg-white rounded shadow p-6 border border-grey-dark">
            <div className="py-1 font-bold text-sm">Log in to Homefilming</div>
            { this.state.errors.length > 0 ?
              <div className="text-red-dark">
                <ul>
                  { this.state.errors.map((err, i) => <li key={`error_${i}`}>{ err.message }</li>) }
                </ul>
              </div>
            : null }
            <form onSubmit={this.handleSubmit}>
              <div className="relative mb-4">
                <input
                  className="input pl-8"
                  name="email"
                  value={email}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Email" />
                <span className="input-icon pin-l">
                  <i className="far fa-envelope"></i>
                </span>
              </div>
              <div className="relative my-4">
                <input
                  className="input pl-8"
                  name="password"
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                  placeholder="Password" />
                <span className="input-icon pin-l">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <div className="flex">
                <div className="flex-1 flex items-end"><Link to="/reset-password">Forgot your password?</Link></div>
                <div className="w-1/4"><button className="button-blue"><span className="action-button-overlay"></span>Login</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(LoginUser, { name: 'loginUser' })(Login)
