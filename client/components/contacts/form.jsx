// @flow
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import cE from '../../styles/common_elements'
import con from './styles/contact'
import ContactTypes from '../../utils/contact_types.js'

type Props = {
  newContact: Function,
  removeContact: Function,
  updateContact: Function,
  cId: string,
  content?: string,
  idx: number,
  contact: Object,
  default: boolean
}

type State = {
  status: string,
  typesOpen: boolean,
  type?: string,
  icon: string,
  ext: string,
  properName: string,
  default: boolean,
  holder: string,
  content: string
}

class ContactForm extends Component<Props, State> {

  handleAddContact: Function
  handleRemoveContact: Function
  handleDefaultContact: Function
  toggleDropdownHandler: Function
  handleTypeChange: Function
  handleContentChange: Function

  constructor(props: Object){
    super(props)
    this.state = {
      idx: props.idx,
      status: props.status,
      ext: 'text',
      content: props.content || props.contact.content,
      default: props.default || props.contact.default,
      holder: 'select type...',
      icon: 'address-card-o',
      properName: 'Contact type',
      typesOpen: false,
    }

    this.handleAddContact = this.handleAddContact.bind(this)
    this.handleRemoveContact = this.handleRemoveContact.bind(this)
    this.handleDefaultContact = this.handleDefaultContact.bind(this)
    this.toggleDropdownHandler = this.toggleDropdownHandler.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  componentDidMount(){
    if(this.props.contact.type){
      const cType = ContactTypes.filter(ct => ct.type === this.props.contact.type ? ct : null )
      this.setState({
        type: cType[0].name,
        icon: cType[0].icon,
        properName: cType[0].humanized,
        holder: cType[0].holder,
        ext: cType[0].ext,
        default: this.props.contact.default,
        content: this.props.contact.content,
        type: this.props.contact.type
      }, function(){
        console.log('this.props.contactFormend', this.state)
      })
    }
  }

  handleAddContact(e: SyntheticEvent<*>){
    this.props.newContact()
  }

  handleRemoveContact(e: SyntheticEvent<*>){
    this.props.removeContact(e.currentTarget.getAttribute('cid'), e.currentTarget.getAttribute('idx'))
  }

  handleTypeChange(e: SyntheticEvent<*>){
    this.setState({
      type: e.currentTarget.getAttribute('name'),
      icon: e.currentTarget.getAttribute('icon'),
      properName: e.currentTarget.getAttribute('proper'),
      holder: e.currentTarget.getAttribute('holder'),
      ext: e.currentTarget.getAttribute('ext'),
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
        content: this.state.content,
        status: this.state.status
      })
    })
  }

  handleDefaultContact(e: SyntheticEvent<HTMLInputElement>){
    this.setState({
      default: true
    }, function(){
      this.props.updateContact({
        id: this.props.cId,
        type: this.state.type,
        content: this.state.content,
        status: this.state.status,
        default: true
      })
    })
  }

  toggleDropdownHandler(){
    this.setState({ typesOpen: !this.state.typesOpen })
  }

  renderButton(id: string, idx: number, method: Function, cssInjection: Object, icon: string){
    return(
      <button
        className="field column"
        onClick={method}
        cid={`${id}`}
        idx={idx}
        className={`${css(cssInjection)} button`}>
        <span className="icon is-small">
          <i className={`fa fa-${icon}`}></i>
        </span>
      </button>
    )
  }

  render(){
    console.log('contactState', this.state)
    return (
      <div className="columns">
        <div className="column is-narrow">
          {this.renderButton(this.props.cId, this.props.idx, this.handleDefaultContact,
            this.props.contact.default ? con.contactButtonDefault : con.contactButtonDefaultUnselected, 'star')}
        </div>
        <div className="column is-narrow">
          <div className={`dropdown ${this.state.typesOpen ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button
                onClick={this.toggleDropdownHandler}
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
                  <span>{ `${ this.state.properName }` }</span>
                  <span className="icon is-small">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className={`dropdown-content rows ${css(con.contactDropdown)}`} >
                { ContactTypes.map((cType, i) =>
                  <a
                    icon={cType.icon}
                    ext={cType.ext ? cType.ext : 'text' }
                    proper={cType.humanized}
                    name={cType.type}
                    holder={cType.placeholder}
                    onClick={this.handleTypeChange}
                    className={`dropdown-item column ${css(con.contactDropdownItem)}`}
                    key={`${cType.type}_${i}`}>
                    <i className={`fa fa-${cType.icon}`} /> {cType.humanized}</a>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className={`${css(con.contactContent)} column`}>
          <div className="control has-icons-left">
            <input
              onChange={this.handleContentChange}
              className="input"
              type={this.state.ext}
              value={this.state.content}
              placeholder={this.state.holder} />
            <span className="icon is-left">
              <i className={`fa fa-${this.state.icon}`}></i>
            </span>
          </div>
        </div>

        <div className={`${css(con.contactButtonArea)} field column is-narrow`}>
          {this.props.idx >= 1 ? this.renderButton(this.props.cId, this.props.idx, this.handleRemoveContact, con.contactButtonMinus, 'minus') : ""}
          {this.renderButton(this.props.cId, this.props.idx, this.handleAddContact, con.contactButtonPlus, 'plus')}
        </div>
      </div>
    )
  }
}

export default ContactForm
