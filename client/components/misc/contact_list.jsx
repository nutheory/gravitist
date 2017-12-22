// @flow
import React, { Component } from 'react'
import { isEmpty, propSatisfies, last, merge, remove, where } from 'ramda'
import { StyleSheet, css } from 'aphrodite'
import Contact from './contact'
import style from './styles/contact'
import ContactTypes from '../../utils/contact_types.js'

type Props = {
  setContactsVerified: Function
}

type State = {
  contacts: Array<Object>
}

class ContactList extends Component<Props, State> {

  getInvalidContacts: Function
  buildContact: Function
  newContact: Function
  updateContact: Function
  removeContact: Function
  checkContactsValidated: Function

  constructor(){
    super()
    this.state = {
      contacts: []
    }

    this.getInvalidContacts = this.getInvalidContacts.bind(this)
    this.buildContact = this.buildContact.bind(this)
    this.newContact = this.newContact.bind(this)
    this.updateContact = this.updateContact.bind(this)
    this.removeContact = this.removeContact.bind(this)
    this.checkContactsValidated = this.checkContactsValidated.bind(this)
  }

  componentDidMount(){
    this.newContact()
  }

  getInvalidContacts(){
    return this.state.contacts.filter(c => c.validated === false ? c : null )
  }

  checkContactsValidated(){
    this.props.setContactsVerified(this.getInvalidContacts().length === 0, this.state.contacts)
  }

  buildContact(){
    const newContact = { id: `new-${Math.floor(Math.random() * 999999)}`, type: "", content: "", validated: false }
    this.setState((prevState) => ({ contacts: this.state.contacts.concat(newContact) }))
  }

  newContact(){
    if(isEmpty(this.state.contacts)){
      this.buildContact()
    } else {
      if(this.getInvalidContacts().length === 0){ this.buildContact() }
    }
  }

  updateContact(updatedContact: Object){
    const cType = ContactTypes.filter(ct => ct.type === updatedContact.type ? ct : null )

    if(cType[0]){ updatedContact.validated = cType[0].validator(updatedContact.content || "")
    } else { updatedContact.validated = false }

    this.setState({ contacts: this.state.contacts.map(c =>
      c.id === updatedContact.id ? merge(c, updatedContact): c )
    }, this.checkContactsValidated)
  }

  removeContact(c: number){
    this.setState((prevState) => ({ contacts: remove(c, 1, prevState.contacts) }))
  }

  render(){
    return (
      <ul id="contactList">
        {this.state.contacts.map((contact, i) => (
          <Contact
            key={`contact_${contact.id}`}
            order={i}
            cId={contact.id}
            contact={contact}
            updateContact={this.updateContact}
            newContact={this.newContact}
            removeContact={this.removeContact}
          />
        ))}
      </ul>
    )
  }
}

export default ContactList
