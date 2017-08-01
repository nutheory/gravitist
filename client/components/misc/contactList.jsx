import React, { Component } from 'react'
import _ from 'lodash'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { StyleSheet, css } from 'aphrodite'
import Contact from './contact.jsx'
import style from './styles/contact'

class ContactList extends Component {
  constructor(){
    super()
    this.state = {
      contacts: []
    }

    this.buildContact = this.buildContact.bind(this)
    this.newContact = this.newContact.bind(this)
    this.createContact = this.createContact.bind(this)
    this.editContact = this.editContact.bind(this)
    this.removeContact = this.removeContact.bind(this)
  }

  componentDidMount(){
    console.log('this.props', this.props)
    this.newContact()
  }

  buildContact(contactState){
    console.log('contactStateED', contactState)
    let idx = _.findIndex(this.state.contacts, { indexId: contactState.indexId })
    if(idx){
      this.editContact(contactState, idx)
    }
    // } else {
    //   this.createContact(contactState)
    // }
  }

  newContact(){
    // const newContactId = `contact-${this.state.contacts.length}`
    const newContactId = _.uniqueId()
    console.log('newContactId', newContactId)
    const newContact = { indexId: newContactId, name: "", content: "" }
    this.setState({ contacts: this.state.contacts.concat([newContact]) }, (res) => {
      // console.log('new+++++++++++', this.state.lastInList)
    })
  }

  createContact(contactState){
    this.setState({ contacts: this.state.contacts.concat([contactState]) }, (res) => {
      this.props.contactsCollection(this.state.contacts)
    })
  }

  editContact(contactState, cIdx){
    console.log('reached?')
    const newContacts = this.state.contacts.map((cte, _idx) => {
      console.log('will this return')
      if (_idx !== cIdx) return cte
      console.log('will this return.... no')
      return {...cte, name: contactState.name, content: contactState.content }
    })
    this.setState({ contacts: newContacts }, () => {
      console.log('contactState', this.state)
    })
  }

  removeContact(contact){
    console.log('find', _.find(this.state.contacts, { indexId: contact }))
    let removeContact = _.findIndex(this.state.contacts, { indexId: contact })
    console.log('removeContact', removeContact)
    let spliced = this.state.contacts.splice(removeContact, 1)
    console.log('spliced', spliced)
    this.setState({contacts: this.state.contacts}, (res) => {
      console.log('removeContact', removeContact)
      console.log('this.state.contacts', this.state.contacts)
    })
  }

  render(){
    return (
      <div id="contactList">
        {this.state.contacts.map((contact, idx) => {
          return (
            <Contact
              key={idx}
              // idx={idx}
              indexId={contact.indexId}
              buildContact={this.buildContact}
              newContact={this.newContact}
              removeContact={this.removeContact}
              renderRemove={this.state.contacts.length > 1}
            />
          )}
        )}
        <div className={css(style.contactButton)}>
          <FloatingActionButton
            mini={true}
            onTouchTap={this.newContact}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    )
  }

}

export default ContactList
