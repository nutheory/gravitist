import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import MenuItem from 'material-ui/MenuItem'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'
import gql from 'graphql-tag'
import ContactTypes from '../../utils/contactTypes.json'

const contactTypes = []
_.each(ContactTypes, (type, i) => {
  // console.log('type', type)
  // console.log('type', type)
  contactTypes.push(<MenuItem value={type.name} key={`${type.name}_${i}`} primaryText={type.humanized} />)
})

class Contact extends Component {
  constructor(){
    super()
    this.state = {
      indexId: "",
      name: "",
      content: ""
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleAddContact = this.handleAddContact.bind(this)
    this.handleRemoveContact = this.handleRemoveContact.bind(this)
  }

  componentDidMount(){
    this.setState({ indexId: this.props.indexId })
  }

  handleAddContact(evt){
    this.props.newContact()
  }

  handleRemoveContact(evt){
    this.props.removeContact()
  }

  handleNameChange(evt, key, payload){
    console.log('evt', evt)
    console.log('key', key.name)
    console.log('payload', payload)
    // this.setState({ name: key.name }, (res) => {
    //   evt.target.value = key.name
    //   console.log('payload', payload)
    //   this.props.buildContact(this.state)
    //   }
    // )
  }

  handleContentChange(evt){
    this.setState({ content: evt.target.value }, (res) => {
      this.props.buildContact(this.state)
    })
  }

  render(){
    return (
      <div>
        <div className={css(layout.fieldRow)}>
          <div className={css(layout.multiColumnEvenSize)}>
            <FormsySelect
              name="contact.name"
              floatingLabelFixed={true}
              onChange={this.handleNameChange}
              value={this.state.name}
              className={css(style.textfieldFullSize)}
              floatingLabelText="Contact label"
              maxHeight={200}
            >
            {contactTypes}
            </FormsySelect>
          </div>
          <div className={css(layout.multiColumnEvenSize, style.contactSplitSection)}>
            <div className={css(style.contactContent)}>
              <FormsyText
                name="contact.content"
                onChange={this.handleContentChange}
                value={this.state.content}
                className={css(style.textfieldFullSize)}
                hintText="Phone #, Username, URL"
                floatingLabelText="Contact info"
              />
            </div>
            <div className={css(style.contactAdd)}>
              <FloatingActionButton
                mini={true}
                onTouchTap={this.handleAddContact}
              >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact
