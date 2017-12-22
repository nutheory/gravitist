// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import cF from '../../styles/common_forms'
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validators'

type Props ={
  setUserVerified: Function
}

type State = {
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string
}

class UserCreate extends Component<Props, State> {

  handleInputChange: Function

  constructor(){
    super()

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, () => {
      this.checkUserVerified()
    })
  }

  checkUserVerified(){
    if (isValidName(this.state.name) &&
      isValidEmail(this.state.email) &&
      isValidPassword(this.state.password) &&
      this.state.confirmPassword === this.state.password){
        this.props.setUserVerified(true, this.state)
      }else if(this.props.userVerified){
        this.props.setUserVerified(false, this.state)
      }
  }

  render(){
    return (
      <div className={`${css(cF.container)}`}>
        <div className="columns">
          <div className="field column">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={this.handleInputChange}
                className="input is-medium"
                name="name"
                type="text"
                placeholder="Full Name" />
              <span className="icon is-medium is-left">
                <i className="fa fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field column">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={this.handleInputChange}
                className="input is-medium"
                name="email"
                type="email"
                placeholder="Email" />
              <span className="icon is-medium is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="field column">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={this.handleInputChange}
                className="input is-medium"
                name="password"
                type="password"
                placeholder="Password" />
              <span className="icon is-medium is-left">
                <i className="fa fa-key"></i>
              </span>
            </div>
          </div>
          <div className="field column">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={this.handleInputChange}
                className="input is-medium"
                name="confirmPassword"
                type="password"
                placeholder="Re-type Password" />
              <span className="icon is-medium is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCreate
