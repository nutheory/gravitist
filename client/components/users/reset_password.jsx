// @flow
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import InitResetPassword from '../../mutations/init_reset_password'
import SaveResetPassword from '../../mutations/reset_password'
import { isValidEmail, isValidPassword } from '../../utils/validators'
import jwtDecode from 'jwt-decode'
import Moment from 'moment'

type Props = {
  history: Object,
  location: Object
}

type State = {
  email: string,
  password: string,
  confirmPassword: string,
  tokenSent: boolean,
  token: Object | null,
  error?: string | null
}

class ResetPassword extends Component<Props, State> {

  handleChange: Function
  handleInitSubmit: Function
  handleRequest: Function
  handleNewPassword: Function

  constructor(props: Object){
    super()

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      tokenSent: false,
      token: props.location.search.split('token=')[1] ? jwtDecode(props.location.search.split('token=')[1]) : null,
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleInitSubmit = this.handleInitSubmit.bind(this)
    this.handleNewPassword = this.handleNewPassword.bind(this)
  }

  handleChange(e: Object){
    const {name, value} = e.currentTarget
    this.setState({ [name]: value })
  }

  async handleInitSubmit(initResetPassword: Function, e: Object){
    e.preventDefault()
    const resolved = await initResetPassword({ variables: { input: { email: this.state.email } } })
    if(resolved.data.initResetPassword.user.email){
      this.setState({ tokenSent: true, error: null })
    } else {
      this.setState({ error: `${this.state.email} does not exist.` })
    }
  }

  async handleNewPassword(saveResetPassword: Function, e: Object){
    e.preventDefault()
    const now = Moment().unix()
    const issued = this.state.token ? this.state.token.iat : ''
    const exp = this.state.token ? this.state.token.exp : ''
    if(this.state.token && Moment(now).isBetween(issued, exp)){
      if(this.state.password === this.state.confirmPassword && isValidPassword(this.state.password)){
        const resolved = await saveResetPassword({ variables: { input: {
          email: this.state.token.email, password: this.state.password } } })
        if(resolved.data.resetPassword.auth ){
          const { data: { resetPassword: { user, auth } } } = resolved
          await localStorage.setItem('hf_auth_header_token', auth.token)
          this.props.history.push('/dashboard')
        }
      } else { this.setState({ error: `Passwords do not match or password is not valid.` }) }
    } else { this.setState({ error: `Reset token expired.` }) }
  }

  render(){
    const { email, password, confirmPassword, tokenSent, error } = this.state
    return(
      <div className="login-container mt-20">
        <div className="login-wrapper">
          <div className="flex">
            <div className="flex-1"></div>
            <Link className="w-32 h-8 block" to="/"><img src={`/${require('../../assets/svg/hf_logo_dark.svg')}`} /></Link>
          </div>
          <div className="text-right text-sm font-bold pb-1">{ !this.state.token ? 'Forgot Password' : 'Reset Password' }</div>
          <div className="w-full bg-white rounded shadow p-6 border border-grey-dark">
            { !this.state.token ?
              <div>
                <div className="py-1 font-bold text-sm">Enter your email and we will send you
                  instructions to reset your password.</div>
                <Mutation mutation={ InitResetPassword }>
                  {(initResetPassword, { data }) => (
                    <form onSubmit={ (e) => this.handleInitSubmit(initResetPassword, e) }>
                      <div className="relative mb-4">
                        <input
                          className="input"
                          name="email"
                          type="text"
                          value={email}
                          onChange={this.handleChange}
                          placeholder="Email address" />
                      </div>
                      <div className="flex">
                        <div className="w-1/3">
                          <button type="submit" className=" action-button button-blue rounded">
                            <span className=" action-button-overlay"></span>Send instructions
                          </button>
                        </div>
                        <div className="pl-4 text-sm flex items-center">
                          { tokenSent ? 'Check your email for a temporary link to reset your password.' : '' }
                          { error ? <span className="text-red">{ error }</span> : '' }
                        </div>
                      </div>
                    </form>
                  )}
                </Mutation>
              </div>
            :
              <div>
                <div className="py-1 font-bold text-sm">Enter a new password.</div>
                <Mutation mutation={ SaveResetPassword }>
                  {(saveResetPassword, { data }) => (
                    <form onSubmit={ (e) => this.handleNewPassword(saveResetPassword, e) }>
                      <div className="relative mb-4">
                        <input
                          className="input"
                          name="password"
                          value={password}
                          type="password"
                          onChange={this.handleChange}
                          placeholder="New password" />
                      </div>
                      <div className="relative mb-4">
                        <input
                          className="input"
                          name="confirmPassword"
                          value={confirmPassword}
                          type="password"
                          onChange={this.handleChange}
                          placeholder="Confirm password" />
                      </div>
                      <div className="flex">
                        <div className="w-1/3">
                          <button type="submit" className=" action-button button-blue rounded">
                            <span className=" action-button-overlay"></span>Save new password
                          </button>
                        </div>
                        <div className="pl-4 text-sm flex items-center">
                          { error ? <span className="text-red">{ error }</span> : '' }
                        </div>
                      </div>
                    </form>
                  )}
                </Mutation>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ResetPassword
