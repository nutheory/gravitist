import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { browserHistory, withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs'
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
      selectedType: "agent"
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.runMutation = this.runMutation.bind(this)
  }

  // componentDidMount(){
  //
  // }

  handleTypeChange(){
    this.setState({ selectedType: (this.state.selectedType === "agent" ? "pilot" : "agent")})
  }

  async runMutation(){
    const resolved = await this.props.loginUser({ variables: {
      input: {
        email: this.state.email,
        password: this.state.password,
        type: this.state.selectedType
        }
      }, refetchQueries: [{ query: CurrentUserQuery }]
    })
    const {data} = resolved
    // if(data.login.email){
      // this.context.router.history.push('/dashboard')
    // }
  }

  handleSubmit(e){
    // this.context.router.history.push('/dashboard')
    e.preventDefault()
    this.runMutation()
    setTimeout(() => {
      this.context.router.history.replace('/dashboard')
    }, 100)
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
