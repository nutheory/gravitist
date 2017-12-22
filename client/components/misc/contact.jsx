// @flow
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import cE from '../../styles/common_elements'
import style from './styles/contact'
import ContactTypes from '../../utils/contact_types.js'

type Props = {
  newContact: Function,
  removeContact: Function,
  updateContact: Function,
  cId: string,
  content?: string,
  order: number,
  contact: Object
}

type State = {
  typesOpen: boolean,
  type?: string,
  icon?: string,
  properName?: string,
  holder?: string,
  content?: string
}

class Contact extends Component<Props, State> {

  handleAddContact: Function
  handleRemoveContact: Function
  toggleDropdownHandler: Function
  handleTypeChange: Function
  handleContentChange: Function

  constructor(){
    super()
    this.state = {
      typesOpen: false,
    }

    this.handleAddContact = this.handleAddContact.bind(this)
    this.handleRemoveContact = this.handleRemoveContact.bind(this)
    this.toggleDropdownHandler = this.toggleDropdownHandler.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  handleAddContact(e: SyntheticEvent<HTMLButtonElement>){
    this.props.newContact()
  }

  handleRemoveContact(e: SyntheticEvent<HTMLButtonElement>){
    this.props.removeContact(e.currentTarget.getAttribute('cid'))
  }

  handleTypeChange(e: SyntheticEvent<*>){
    this.setState({
      type: e.currentTarget.getAttribute('name'),
      icon: e.currentTarget.getAttribute('icon'),
      properName: e.currentTarget.getAttribute('proper'),
      holder: e.currentTarget.getAttribute('holder'),
      typesOpen: false
    }, function(){
      this.props.updateContact({
        id: this.props.cId,
        type: this.state.type,
        content: this.state.content
      })
    })
  }

  handleContentChange(e: SyntheticEvent<HTMLInputElement>){
    this.setState({
      content: e.currentTarget.value
    }, function(){
      this.props.updateContact({
        id: this.props.cId,
        type: this.state.type,
        content: this.state.content
      })
    })
  }

  toggleDropdownHandler(){
    this.setState({ typesOpen: !this.state.typesOpen })
  }

  renderButton(i: number, method: Function, cssInjection: Object, icon: string){
    return(
      <button
        className="field column"
        onClick={method}
        cid={`${i}`}
        className={`${css(cssInjection, style.contactButton)} button`}>
        <span className="icon is-small">
          <i className={`fa fa-${icon}`}></i>
        </span>
      </button>
    )
  }

  render(){
    return (
      <li className="columns">
        <div className="column">
          <div className={`dropdown ${this.state.typesOpen ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button
                onClick={this.toggleDropdownHandler}
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
                  <span>{ `${this.state.properName ? this.state.properName : 'Contact type'}` }</span>
                  <span className="icon is-small">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className={`dropdown-content rows ${css(style.contactDropdown)}`} >
                { ContactTypes.map((cType, i) =>
                  <a
                    icon={cType.icon}
                    proper={cType.humanized}
                    name={cType.type}
                    holder={cType.placeholder}
                    onClick={this.handleTypeChange}
                    className={`dropdown-item column ${css(style.contactDropdownItem)}`}
                    key={`${cType.type}_${i}`}>
                    <i className={`fa fa-${cType.icon}`} /> {cType.humanized}</a>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className={`${css(style.contactContent)} column`}>
          <div className="control has-icons-left">
            <input
              onChange={this.handleContentChange}
              className="input "
              type="text"
              value={this.props.content}
              placeholder={`${this.state.holder ? this.state.holder : 'select type...' }`} />
            <span className="icon is-left">
              <i className={`fa fa-${this.state.icon ? this.state.icon :'address-card-o'}`}></i>
            </span>
          </div>
        </div>
        <div className={`${css(style.contactButtonArea)} field column`}>
          {this.props.order >= 1 ? this.renderButton(this.props.order, this.handleRemoveContact, cE.ctaRed, 'minus') : ""}
          {this.renderButton(this.props.order, this.handleAddContact, cE.ctaPurple, 'plus')}
        </div>
      </li>
    )
  }
}

export default Contact
