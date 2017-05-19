import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'

class UserForm extends Component {
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

  componentDidMount(){
    this.setState({ type: this.props.type})
  }

  handleNameChange(evt){
    this.setState({ name: evt.target.value }, (res) => {
      this.props.userState(this.state)
    })
  }

  handleEmailChange(evt){
    this.setState({ email: evt.target.value }, (res) => {
      this.props.userState(this.state)
    })
  }

  handlePasswordChange(evt){
    this.setState({ password: evt.target.value }, (res) => {
      this.props.userState(this.state)
    })
  }

  render(){
    return (
      <div>

        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsyText
              name="user.name"
              validations={{
                minLength: 2
              }}
              required={true}
              validationError="Required field"
              onChange={this.handleNameChange}
              value={this.state.name}
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
              required={true}
              validationError="This is not a valid email"
              onChange={this.handleEmailChange}
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
              required={true}
              validationError="Password must be at least 6 chars"
              onChange={this.handlePasswordChange}
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
      </div>
    )
  }
}

export default UserForm
