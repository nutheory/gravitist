// @flow
import React, { Component } from 'react'
import { isEmpty, propSatisfies, last, merge, remove, where, concat, clone, times } from 'ramda'
import ContactForm from './form'
import { formatPhone } from '../../utils/helpers'
import ContactTypes from '../../utils/contact_types'

type Props = {
  restrictedMode?: boolean,
  editMode: boolean,
  contacts?: Array<Object>,
  handleReturnedContacts: Function
}

type State = {
  editModeEnabled?: boolean,
  contacts: Array<Object>
}

class ContactList extends Component<Props, State> {

  getValidContacts: Function
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

    this.getValidContacts = this.getValidContacts.bind(this)
    this.getInvalidContacts = this.getInvalidContacts.bind(this)
    this.buildContact = this.buildContact.bind(this)
    this.newContact = this.newContact.bind(this)
    this.updateContact = this.updateContact.bind(this)
    this.removeContact = this.removeContact.bind(this)
    this.checkContactsValidated = this.checkContactsValidated.bind(this)
  }

  componentDidMount(){
    if(this.props.contacts && this.props.contacts.length > 0 ){
      const con = clone(this.props.contacts)
      const contactList = con.map(c => {
        if(!c.validated){
          const cType = ContactTypes.filter(ct => ct.type === c.type ? ct : null )[0]
          c.validated = cType.validator(c.content)
        }
        return c
      })

      this.setState((prevState) => ({ contacts: concat(prevState.contacts, con) }), function(){
        this.state.contacts.length < 2 ? this.newContact() : null
      })
    } else {
      this.newContact(2)
    }
  }

  getInvalidContacts(){
    return this.state.contacts.filter(c => c.validated === false ? c : null )
  }

  getValidContacts(){
    return this.state.contacts.filter(cnt => cnt.validated === true ? cnt : null )
  }

  checkContactsValidated(){
    this.props.handleReturnedContacts(this.getValidContacts())
  }

  buildContact(def: Object){
    const newContact = { id: `new-${Math.floor(Math.random() * 999999)}`, type: "",
      content: "", validated: false, status: "new", default: def.default }
    this.setState((prevState) => ({ contacts: prevState.contacts.concat(newContact) }), function(){
      def.contactCount > 0 ? this.buildContact({ default: false, contactCount: def.contactCount - 1 }) : null
    })
  }

  newContact(numberOfContacts: number){
    this.buildContact({ default: true, contactCount: numberOfContacts ? numberOfContacts : 1 })
  }

  updateContact(updatedContact: Object){
    const cType = ContactTypes.filter(ct => ct.type === updatedContact.type ? ct : null )[0]
    if(cType){
      if(cType.type === "phone"){
        updatedContact.content = formatPhone(updatedContact.content)
      }
      updatedContact.validated = cType.validator(updatedContact.content || "")
    } else {
      updatedContact.validated = false
    }

    if(updatedContact.default === true){
      this.setState({ contacts: this.state.contacts.map(c =>
        c.id === updatedContact.id ? merge(c, updatedContact) : merge(c, { default: false }) )
      }, this.checkContactsValidated)
    } else {
      this.setState({ contacts: this.state.contacts.map(c =>
        c.id === updatedContact.id ? merge(c, updatedContact) : c )
      }, this.checkContactsValidated )
    }

    if(updatedContact.content === ""){
      this.setState({ contacts: this.state.contacts.map((c, i) =>
        c.id === updatedContact.id ? merge(c, { content: "" }) : c )
      }, this.checkContactsValidated )
    }
  }

  removeContact(contactId: string, idx:  number){
    const regex = new RegExp('^new-', 'i')
    if(regex.test(contactId)){
      this.setState(prevState => ({ contacts: remove(idx, 1, prevState.contacts) }), this.checkContactsValidated )
    } else {
      this.setState({ contacts: this.state.contacts.map((c, i) =>
        c.id === contactId ? merge(c, { status: "delete", validated: true }) : c )
      }, this.checkContactsValidated )
    }
    if(this.props.restricedMode){
      this.state.contacts.length < 2 ? this.newContact() : null
    }
  }

  renderContact(cnt: Object){
    const cType = ContactTypes.filter(ct => ct.type === cnt.type ? ct : null )[0]

    if(cType){
      return (
        <div className="flex">
          <div className="mr-4"><i className={`${cType.icon}`} /></div>
          <div className="flex-1 font-bold">{ cType.formatter ? cType.formatter(cnt.content) : cnt.content }</div>
          <div className="font-bold text-grey">{cType.type}</div>
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        { this.props.editMode ?
          <div>
            { this.props.restrictedMode ?
              <ul id="contactList">
                <li className="my-2">
                  { this.state.contacts[0] && this.state.contacts[0].status !== "delete" ?
                    <ContactForm
                      idx={0}
                      default={this.state.contacts[0].default}
                      status={this.state.contacts[0].status === "new" ? this.state.contacts[0].status : "update" }
                      cId={this.state.contacts[0].id ? this.state.contacts[0].id : ''}
                      contact={this.state.contacts[0]}
                      restrictedMode={ this.props.restrictedMode }
                      updateContact={this.updateContact}
                      newContact={this.newContact}
                      removeContact={this.removeContact} />
                  : null }
                </li>
                <li className="my-2">
                  { this.state.contacts[1] && this.state.contacts[1].status !== "delete" ?
                    <ContactForm
                      idx={1}
                      default={this.state.contacts[1].default}
                      status={this.state.contacts[1].status === "new" ? this.state.contacts[1].status : "update" }
                      cId={this.state.contacts[1].id ? this.state.contacts[1].id : ''}
                      contact={this.state.contacts[1]}
                      restrictedMode={ this.props.restrictedMode }
                      updateContact={this.updateContact}
                      newContact={this.newContact}
                      removeContact={this.removeContact} />
                  : null }
                </li>
              </ul>
            : <ul id="contactList">
              { this.state.contacts.map((contact, i) => (
                <li key={`contact_${contact.id}`} className="my-2">
                  { contact.status !== "delete" ?
                    <ContactForm
                      idx={i}
                      default={contact.default}
                      status={contact.status === "new" ? contact.status : "update" }
                      cId={contact.id}
                      contact={contact}
                      updateContact={this.updateContact}
                      newContact={this.newContact}
                      removeContact={this.removeContact} />
                  : null }
                </li>
              ))}
            </ul> }
          </div>
        : <ul id="contactList">
            { this.state.contacts.map(contact => (
              <li key={`contact_${contact.id}`} className="my-2">
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
