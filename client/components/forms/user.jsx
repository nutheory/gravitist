import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'
import gql from 'graphql-tag'

class UserForm extends Component {
  constructor(){
    super()
    this.state = {
      user_name: "",
      user_email: "",
      user_password: ""
    }
  }

  // changeValue(evt){
  //   this.setValue(evt.currentTarget.value)
  //   console.log(this.state)
  // }

  handleNameChange(evt){
    this.setState({ user_name: evt.target.value })
  }

  handleEmailChange(evt){
    // let valid = this.validateEmail(evt.target.value)
    this.setState({ user_email: evt.target.value })
  }
  //
  // handlePasswordConfirm(evt){
  //   if(this.PasswordConfirmInput.input.value === this.PasswordInput.input.value &&
  //     this.PasswordInput.input.value.length >= 6){
  //       this.setState({ user_password: this.refs.user_password })
  //   } else {
  //     this.setState({ user_password: '' })
  //   }
  // }

  render(){
    return (
      <fieldset className={css(layout.fieldPadding)}>
        <h4>Your Info</h4>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="user.name"
              validations={{
                minLength: 2
              }}
              validationError="Required field"
              onChange={this.handleNameChange.bind(this)}
              value={this.state.user_name}
              className={css(style.textfieldFullSize)}
              hintText="Name"
              floatingLabelText="Name"
            />
          </div>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="user.email"
              validations={{
                isEmail: true
              }}
              validationError="This is not a valid email"
              onChange={this.handleEmailChange.bind(this)}
              value={this.state.user_email}
              className={css(style.textfieldFullSize)}
              hintText="Email"
              floatingLabelText="Email"
            />
          </div>
        </div>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="user.password"
              validations={{
                minLength: 6
              }}
              validationError="Password must be at least 6 chars"
              // onChange={this.changeValue.bind(this)}
              className={css(style.textfieldFullSize)}
              hintText="Create Password"
              floatingLabelText="Create Password"
              type="password"
              required
            />
          </div>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="user_confirm_password"
              validations="equalsField:user.password"
              validationError="Password must match"
              className={css(style.textfieldFullSize)}
              hintText="Confirm Password"
              floatingLabelText="Confirm Password"
              type="password"
              required
            />
          </div>
        </div>
      </fieldset>
    )
  }
}

export default UserForm
