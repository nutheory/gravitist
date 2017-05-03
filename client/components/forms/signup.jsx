import React, { Component } from 'react'
import Formsy from 'formsy-react'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import layout from './styles/layout'
import Address from './address.jsx'
import Phone from './phone.jsx'
import User from './user.jsx'

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      plan: null,
      canSubmit: false
    }
  }

  componentDidMount(){
    this.setState({ plan: this.props.match.params.plan })
    console.log('this.props', this.props)
    console.log('this.state', this.state)
  }

  componentWillUnmount(){
    this.setState({
      plan: null,
      canSubmit: false
    })
  }

  enableButton(){
    this.setState({ canSubmit: true })
  }

  disableButton(){
    this.setState({ canSubmit: false })
  }

  handleSubmit(evt){
    const {name, email, password} = evt.user
    let type = ""
    if(this.props.match.params.plan === "!!admin!!"){
      type = "admin"
    } else if(this.state.plan === "pilot"){
      type = "pilot"
    } else if(this.state.plan){
      type = "user"
    }
    this.props.mutate({variables: {name, email, password, type}})
  }

  render(){
    return(
      <div className={css(layout.container)}>
        <h3>Signup</h3>
        <Formsy.Form
          onInvalid={this.disableButton.bind(this)}
          onValid={this.enableButton.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <User />
          {/* <Phone />
          <Address /> */}

          <fieldset>
            <RaisedButton
              type="submit"
              label="Signup"
              fullWidth={ true }
              disabled={ !this.state.canSubmit }
            />
          </fieldset>
        </Formsy.Form>
      </div>
    )
  }
}

const createUserMutation = gql`
  mutation createUser($name: String!, $email: String!, $password: String!, $type: String!){
    createUser(name: $name, email: $email, password: $password, type: $type){
      name
    }
  }
`

const AddUserWithMutation = graphql(createUserMutation)(Signup)
console.log('AddUserWithMutation', AddUserWithMutation)
export default AddUserWithMutation
