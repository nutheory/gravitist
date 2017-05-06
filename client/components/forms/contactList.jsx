import React, { Component } from 'react'
import _ from 'lodash'
import Contact from './contact.jsx'

class ContactList extends Component {
  constructor(){
    super()
    this.state = {
      contacts: [],
      contactComps: ['contact-0']
    }

    this.buildContact = this.buildContact.bind(this)
    this.newContact = this.newContact.bind(this)
    this.createContact = this.createContact.bind(this)
    this.removeContact = this.removeContact.bind(this)
  }

  componentDidMount(){
    console.log('this.props', this.props)
  }

  buildContact(contactState){
    let contact = _.find(this.state.contacts, { indexId: contactState.indexId })
    // console.log("this.contact2", contact)
    if(contact){
      this.editContact(contact)
    } else {
      this.createContact(contactState)
      // setTimeout(() => {
      //   console.log("this.stateSSS", this.state)
      // }, 100)
    }
  }

  newContact(){
    let newContact = `contact-${this.state.contactComps.length}`;
    this.setState({ contactComps: this.state.contacts.concat([newContact]) })
  }

  createContact(contactState){
    this.setState({ contacts: this.state.contacts.concat([contactState]) }, (res) => {
      this.props.contactsCollection(this.state.contacts)
    })
  }

  editContact(contact){
    this.setState({ contacts: this.state.contacts.map((cte) => {
      return {...cte, contact}
      })}, (res) => {
      this.props.contactsCollection(this.state.contacts)
    })
  }

  removeContact(contact){
    let removeContact = _.find(this.state.contacts, { indexId: contact.indexId })

  }

  render(){
    return (
      <div id="contactList">
        {this.state.contactComps.map(contact => <Contact key={contact} indexId={contact} buildContact={this.buildContact} newContact={this.newContact} removeContact={this.removeContact} />)}
      </div>
    )
  }

}

export default ContactList
