import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Formsy from 'formsy-react'
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import MenuItem from 'material-ui/MenuItem'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { css } from 'aphrodite'
import cF from '../../styles/commonForms'
import style from './styles/contact'
import gql from 'graphql-tag'
import ContactTypes from '../../utils/contactTypes.json'

const contactTypes = []
_.each(ContactTypes, (type, i) => {
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

  componentWillUnmount(){

  }

  handleAddContact(evt){
    this.props.newContact()
  }

  handleRemoveContact(evt){
    console.log('this.state', this.state.indexId)
    this.props.removeContact(this.state.indexId)
  }

  handleNameChange(evt, key, payload){
    this.setState({ name: key}, (res) => {
      this.props.buildContact(this.state)
    })
  }

  handleContentChange(evt){
    this.setState({ content: evt.target.value }, (res) => {
      this.props.buildContact(this.state)
    })
  }

  renderAddButton(){
    return(
      <div className={css(style.contactButton)}>
        <FloatingActionButton
          mini={true}
          onTouchTap={this.handleAddContact}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }

  renderRemoveButton(){
    return(
      <div className={css(style.contactButton)}>
        <FloatingActionButton
          mini={true}
          backgroundColor="#900"
          onTouchTap={this.handleRemoveContact}
        >
          <ContentRemove />
        </FloatingActionButton>
      </div>
    )
  }

  renderRemove(render){
    if(render){
      return this.renderRemoveButton()
    }
  }

  render(){
    return (
      <div>
        <div className={css(cF.row)}>
          <div className={css(cF.area)}>
            <FormsySelect
              name="contact.name"
              onChange={this.handleNameChange}
              value={this.state.name}
              className={css(cF.element)}
              floatingLabelText="Contact label"
              maxHeight={200}
            >
            {contactTypes}
            </FormsySelect>
          </div>
          <div className={css(cF.area, style.contactSplitSection)}>
            <div className={css(style.contactContent)}>
              <FormsyText
                name="contact.content"
                onChange={this.handleContentChange}
                value={this.state.content}
                className={css(cF.element)}
                hintText="Phone #, Username, URL"
                floatingLabelText="Contact info"
              />
            </div>

            {this.renderRemove(this.props.renderRemove)}

          </div>
        </div>
      </div>
    )
  }
}

export default Contact
