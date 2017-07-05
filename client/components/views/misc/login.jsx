import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs'
import Formsy from 'formsy-react'
import jwt from 'jsonwebtoken'
import { FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import LoginUser from '../../../mutations/login'
import { StyleSheet, css } from 'aphrodite'
import lg from './styles/login'

class Login extends Component {

  constructor(){
    super()
    this.state = {
      email: "",
      password: "",
      selectedType: "agent"
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.runMutation = this.runMutation.bind(this)
  }

  componentDidMount(){

  }

  handleTypeChange(){
    this.setState({ selectedType: (this.state.selectedType === "agent" ? "pilot" : "agent")})
  }

  async runMutation(){
    // console.log('email', this.state.email)
    // console.log('password', this.state.password)
    // console.log('selectedType', this.state.selectedType)
    const resolved = await this.props.loginUser({ variables: {
      input: {
        email: this.state.email,
        password: this.state.password,
        type: this.state.selectedType
      }
    }})
    console.log('resolved', resolved)
    if(resolved.data.login.token){localStorage.setItem('hf_auth_header_token', resolved.data.login.token)}
  }

  handleSubmit(e){
    e.preventDefault()
    this.runMutation()
  }

  render(){
    console.log(this.state.selectedType)
    return(
      <div className={css(lg.container)}>
        <Formsy.Form>
          <Tabs
            value={this.state.selectedType}
            onChange={this.handleTypeChange}
          >
            <Tab label="Agents" value="agent">
              <h3 className={css(lg.header)}>Agent Login</h3>
            </Tab>
            <Tab label="Pilots" value="pilot">
              <h3 className={css(lg.header)}>Pilot Login</h3>
            </Tab>
          </Tabs>
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
