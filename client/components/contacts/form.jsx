// @flow
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import cE from '../../styles/common_elements'
import con from './styles/contact'
import InputMask from 'react-input-mask'
import ContactTypes from '../../utils/contact_types.js'

type Props = {
  restrictedMode?: boolean,
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
  mask?: string,
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
      icon: 'far fa-address-card',
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
      const cType = ContactTypes.filter(ct => ct.type === this.props.contact.type ? ct : null )[0]
      this.setState({
        type: cType.name,
        icon: cType.icon,
        properName: cType.humanized,
        holder: cType.holder,
        ext: cType.ext,
        mask: cType.mask,
        default: this.props.contact.default,
        content: this.props.contact.content,
        type: this.props.contact.type
      }, function(){})
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
      mask: e.currentTarget.getAttribute('mask'),
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
    // let content
    // if(this.state.type === "phone"){
    //   content =
    // } else {
    //   content = e.currentTarget.value
    // }
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

  renderButton(id: string, idx: number, method: Function, cssInjection: string, icon: string){
    return(
      <button
        onClick={method}
        cid={`${id}`}
        idx={ idx }
        className={`h-full ${cssInjection}`}>
        <span className="flex items-center justify-center">
          <i className={`${icon}`}></i>
        </span>
      </button>
    )
  }

  render(){
    return (
      <div className="flex">
        { !this.props.restrictedMode ?
        <div className="mr-4">
          {this.renderButton(this.props.cId, this.props.idx, this.handleDefaultContact,
            this.props.contact.default ? 'text-green-dark' : 'text-grey-light', 'fa fa-check')}
        </div>
        : null }
        <div className="mr-4">
          <div className={`dropdown relative ${this.state.typesOpen ? 'is-active' : ''}`}>
            <div className="dropdown-trigger hover:cursor-pointer" onClick={this.toggleDropdownHandler}>
              <div
                className="select-faker"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
                  <span>{ `${ this.state.properName }` }</span>
                  <span className="inline-block ml-6">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
              </div>
            </div>
            <div className={`dropdown-menu ${ this.state.typesOpen ? 'block' : 'hidden' }`} id="dropdown-menu" role="menu">
              <div className="p-2 flex flex-wrap bg-white border border-grey rounded" style={{ width: '22rem' }} >
                { ContactTypes.map((cType, i) =>
                  <a
                    icon={cType.icon}
                    ext={cType.ext ? cType.ext : 'text' }
                    proper={cType.humanized}
                    name={cType.type}
                    mask={cType.mask}
                    holder={cType.placeholder}
                    onClick={this.handleTypeChange}
                    className="w-1/2 block px-2 py-1 hover:cursor-pointer"
                    key={`${cType.type}_${i}`}>
                    <i className={`inline-block mr-3 ${cType.icon}`} />{cType.humanized}</a>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className={`flex-1${ !this.props.restrictedMode ? ' mr-4' : '' }`}>
          <div className="">
            <InputMask
              mask={this.state.mask ? this.state.mask : ''}
              onChange={this.handleContentChange}
              className="input"
              type={this.state.ext}
              value={this.state.content}
              placeholder={this.state.holder} />
          </div>
        </div>
        { !this.props.restrictedMode ?
          <div className={`${css(con.contactButtonArea)} field column is-narrow`}>
            {/* {this.props.idx >= 1 ? this.renderButton(this.props.cId, this.props.idx, this.handleRemoveContact, con.contactButtonMinus, 'fas fa-minus') : ""}
            {this.renderButton(this.props.cId, this.props.idx, this.handleAddContact, con.contactButtonPlus, 'fas fa-plus')} */}
          </div>
        : null }
      </div>
    )
  }
}

export default ContactForm
