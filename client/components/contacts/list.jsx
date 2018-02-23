// @flow
import React, { Component } from 'react'
import { isEmpty, propSatisfies, last, merge, remove, where, concat } from 'ramda'
import { StyleSheet, css } from 'aphrodite'
import ContactForm from './form'
import con from './styles/contact'
import ContactTypes from '../../utils/contact_types.js'

type Props = {
  editMode: boolean,
  contacts?: Array<Object>,
  handleReturnedContacts: Function
}

type State = {
  editModeEnabled?: boolean,
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
    if(this.props.contacts){
      const con = this.props.contacts
      this.setState((prevState) => ({ contacts: concat(prevState.contacts, con) }), function(){
      })
    } else {
      this.newContact()
    }
  }

  getInvalidContacts(){
    return this.state.contacts.filter(c => c.validated === false ? c : null )
  }

  checkContactsValidated(){
    this.props.handleReturnedContacts(this.getInvalidContacts().length === 0, this.state.contacts)
  }

  buildContact(def: Object){
    const newContact = { id: `new-${Math.floor(Math.random() * 999999)}`, type: "",
      content: "", validated: false, status: "new", default: def.default }
    this.setState((prevState) => ({ contacts: this.state.contacts.concat(newContact) }))
  }

  newContact(){
    if(isEmpty(this.state.contacts)){
      this.buildContact({ default: true })
    } else {
      if(this.getInvalidContacts().length === 0){ this.buildContact({ default: false }) }
    }
  }

  updateContact(updatedContact: Object){
    const cType = ContactTypes.filter(ct => ct.type === updatedContact.type ? ct : null )

    if(cType[0]){ updatedContact.validated = cType[0].validator(updatedContact.content || "")
    } else { updatedContact.validated = false }

    if(updatedContact.default === true){
      console.log('updatedContactIN', updatedContact)
      this.setState({ contacts: this.state.contacts.map(c =>
        c.id === updatedContact.id ? merge(c, updatedContact) : merge(c, { default: false }) )
      }, this.checkContactsValidated)
    } else {
      this.setState({ contacts: this.state.contacts.map(c =>
        c.id === updatedContact.id ? merge(c, updatedContact) : c )
      }, this.checkContactsValidated )
    }
  }

  removeContact(contactId: string, idx:  number){
    const regex = new RegExp('^new-', 'i')
    if(regex.test(contactId)){
      this.setState(prevState => ({ contacts: remove(idx, 1, prevState.contacts) }), this.checkContactsValidated )
    } else {
      this.setState({ contacts: this.state.contacts.map((c, i) =>
        c.id === contactId ? merge(c, { status: "delete" }) : c )
      }, this.checkContactsValidated )
    }
  }

  renderContact(cnt: Object){
    const cType = ContactTypes.filter(ct => ct.type === cnt.type ? ct : null )
    return (
      <div className={`${css(con.contactDisplayItemInner)} columns`}>
        <div className={`${css(con.contactDisplayIcon)} column is-narrow`}><i className={`${cType[0].icon} fa-2x`} /></div>
        <div className={`${css(con.contactDisplayContent)} column `}>
          <div className="title is-4">{cnt.content}</div>
        </div>
        <div className={`column is-narrow`}>
          <div className={`${css(con.contactDisplayType)} title is-4`}>{cType[0].type}</div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div>
        { this.props.editMode ?
          <ul id="contactList">
            { this.state.contacts.map((contact, i) => (
              <li key={`contact_${contact.id}`}>
                { contact.status !== "delete" ?
                  <ContactForm
                    idx={i}
                    default={contact.default}
                    status={contact.status === "new" ? contact.status : "update" }
                    cId={contact.id}
                    contact={contact}
                    updateContact={this.updateContact}
                    newContact={this.newContact}
                    removeContact={this.removeContact}
                  />
                : null }
              </li>
            ))}
          </ul>
        :
          <ul id="contactList">
            { this.state.contacts.map(contact => (
              <li key={`contact_${contact.id}`} className={`${css(con.contactDisplayItem)}`}>
                {this.renderContact(contact)}
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

export default ContactList
