import React, { Component } from 'react'
import Formsy from 'formsy-react'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Mutation from '../../mutations/signup'
import layout from './styles/layout'
import style from './styles/styling'
import Address from './address.jsx'
import ContactList from './contactList.jsx'
import User from './user.jsx'

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      plan: null,
      canSubmit: false,
      user: {},
      address: {},
      contacts: []
    }

    this.userState = this.userState.bind(this)
    this.addressState = this.addressState.bind(this)
    this.contactsCollection = this.contactsCollection.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  userState(user){
    this.setState({ user })
    setTimeout(() => {
      console.log("this.stateSSS", this.state)
    }, 100)
  }

  addressState(address){
    this.setState({ address })
    console.log("this.stateSSS", this.state)
  }

  contactsCollection(contacts){
    console.log("signuppppp", this.state)
    this.setState({ contacts })
    setTimeout(() => {
      console.log("this.stateSSS", this.state)
    }, 100)
  }

  componentDidMount(){
    console.log('refs', this.contactAddArea)
    this.setState({ plan: this.props.match.params.plan })
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
    this.props.mutate({variables: {name, email, password, type}})
  }

  render(){
    return(
      <div className={css(layout.container)}>
        <h3 className={css(style.sectionTitle)}>New User Signup</h3>
        <Formsy.Form
          onInvalid={this.disableButton}
          onValid={this.enableButton}
          onSubmit={this.handleSubmit}
        >
          <fieldset className={css(layout.fieldPadding)}>
            <h4 className={css(style.sectionTitle)}>Personal info</h4>
            <User userState={this.userState} type={this.props.match.params.type} />
          </fieldset>
          <fieldset className={css(layout.fieldPadding)}>
            <h4 className={css(style.sectionTitle)}>Contact info</h4>
            <ContactList contactsCollection={this.contactsCollection} />
          </fieldset>
          <fieldset className={css(layout.fieldPadding)}>
            <h4 className={css(style.sectionTitle)}>Address</h4>
            <Address addressState={this.addressState} />
          </fieldset>
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

// const createUserMutation = gql`
//   mutation createUser($name: String!, $email: String!, $password: String!, $type: String!){
//     createUser(name: $name, email: $email, password: $password, type: $type){
//       name
//     }
//   }
// `

const AddUserWithMutation = graphql(Mutation)(Signup)
// console.log('AddUserWithMutation', AddUserWithMutation)
export default AddUserWithMutation
