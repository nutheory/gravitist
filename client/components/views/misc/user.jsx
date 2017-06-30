import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import { StyleSheet, css } from 'aphrodite'
import cF from '../../../styles/commonForms'
import style from './styles/user'

class UserCreate extends Component {
  constructor(){
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      type: ""
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  // componentDidMount(){
  //   // this.setState({ type: this.props.type})
  // }

  handleNameChange(evt){
    this.setState({ name: evt.target.value }, () => {
      this.props.setUserInfo(this.state)
    })
  }

  handleEmailChange(evt){
    console.log('this', evt)
    // console.log('this', this.isValid)
    this.setState({ email: evt.target.value }, (res) => {
      this.props.setUserInfo(this.state)
    })
  }

  handlePasswordChange(evt){
    this.setState({ password: evt.target.value }, (res) => {
      this.props.setUserInfo(this.state)
    })
  }

  render(){
    return (
      <div className={css(cF.container)}>

        <div className={css(cF.row)}>
          <div className={css(cF.area)}>
            <FormsyText
              name="user.name"
              validations={{
                minLength: 2
              }}
              required={true}
              validationError="Required field"
              onChange={this.handleNameChange}
              value={this.state.name}
              className={css(cF.element)}
              floatingLabelText="Name"
            />
          </div>
          <div className={css(cF.area)}>
            <FormsyText
              name="user.email"
              validations={{
                isEmail: true
              }}
              required={true}
              validationError="This is not a valid email"
              onChange={this.handleEmailChange}
              value={this.state.user_email}
              className={css(cF.element)}
              floatingLabelText="Email"
            />
          </div>
        </div>
        <div className={css(cF.row)}>
          <div className={css(cF.area)}>
            <FormsyText
              name="user.password"
              validations={{
                minLength: 6
              }}
              required={true}
              validationError="Password must be at least 6 chars"
              onChange={this.handlePasswordChange}
              className={css(cF.element)}
              floatingLabelText="Create Password"
              type="password"
              required
            />
          </div>
          <div className={css(cF.area)}>
            <FormsyText
              name="user_confirm_password"
              validations="equalsField:user.password"
              validationError="Password must match"
              className={css(cF.element)}
              floatingLabelText="Confirm Password"
              type="password"
              required
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserCreate
