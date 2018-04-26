// @flow
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { isValidEmail, isValidName, isValidPhone } from '../../../utils/validators'
import InputMask from 'react-input-mask'
import { formatPhone } from '../../../utils/helpers'
import LeadMutation from '../../../mutations/create_lead'


type Props = {
  orderId: number,
  agent: Object,
  contacts: Array<Object>
}

type State = {
  name: string,
  type: string,
  content: string,
  leadTypeOpen: boolean,
  leadSubmitted: boolean
}

class LeadForm extends Component<Props, State> {

  toggleDropdownHandler: Function
  handleTypeChange: Function
  handleInputChange: Function
  submitLead: Function

  constructor(props: Object){
    super(props)

    this.state ={
      name: "",
      content: "",
      type: "email",
      leadTypeOpen: false,
      leadSubmitted: false
    }

    this.toggleDropdownHandler = this.toggleDropdownHandler.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitLead = this.submitLead.bind(this)
  }

  toggleDropdownHandler(){
    this.setState({ leadTypeOpen: !this.state.leadTypeOpen })
  }

  handleInputChange(e: SyntheticEvent<*>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  handleTypeChange(e: SyntheticEvent<*>){
    this.setState({
      type: e.currentTarget.getAttribute("leadtype"),
      leadTypeOpen: !this.state.leadTypeOpen })
  }

  async submitLead(createLead: Function, e: SyntheticEvent<*>){
    e.preventDefault()
    if(isValidName(this.state.name) && this.state.leadSubmitted === false &&
    ((this.state.type === "email" && isValidEmail(this.state.content)) ||
    (this.state.type === "phone" && isValidPhone(this.state.content)))){
      const resolved = await createLead({ variables: { input: {
        contactableId: this.props.orderId,
        lead: {
          name: this.state.name,
          type: this.state.type,
          content: formatPhone(this.state.content)
        }
      } } })
      this.setState({ leadSubmitted: true })
    }
  }

  render(){
    const agent = this.props.agent
    return(
      <div className="rounded-lg bg-grey-darkest shadow-lg">
        <div className="p-4 border-b-2 border-black">
          <div className="text-sm text-center ">CONTACT AGENT</div>
          { agent.avatar.url ?
            <div className="text-center mt-4">
              <img src={agent.avatar.url} className="w-24 h-24 rounded-full" />
            </div>
          : null }
          { agent.name ?
            <div className="mt-4 text-center text-xl font-bold">{agent.name}</div>
          : null }
          { agent.bio ?
            <div className="mt-2 text-center text-sm">{agent.bio}</div>
          : null }
          <div className="mt-4">
            { this.props.contacts.map((cnt,i) => (
              <div key={`contact_${i}`} className="mb-2">
                <div className="text-xs text-center">{cnt.type}</div>
                <div className="text-lg text-center font-bold">{cnt.content}</div>
              </div>
            )) }
          </div>
        </div>

        <div className="p-4">
          <p className="mb-2">Would you like to be contacted?</p>
          <Mutation mutation={LeadMutation}>
            {(createLead, { data }) => (
              <form onSubmit={(e) => this.submitLead(createLead, e)}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="input"
                    name="name"
                    placeholder="Full name"
                    onChange={this.handleInputChange} />
                </div>
                <div className="flex mb-2">
                  <div className="flex-1 pr-4 text-sm text-right">
                    Preferred method<br />of contact
                  </div>
                  <div className="">
                    <div className={`dropdown relative ${ this.state.planOpen ? 'is-active' : '' }`}>
                      <div className="dropdown-trigger hover:cursor-pointer">
                        <div
                          onClick={this.toggleDropdownHandler}
                          className="select-faker"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu">
                          <span className="capitalize">{ `${ this.state.type }` }</span>
                          <span className="inline-block ml-6">
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                      <div className={`dropdown-menu ${ this.state.leadTypeOpen ? 'block' : 'hidden' }`} id="dropdown-menu" role="menu">
                        <div className="p-2 flex flex-wrap bg-white border border-grey rounded">
                          <a
                            onClick={this.handleTypeChange}
                            className="w-full block px-2 py-1 hover:cursor-pointer text-black"
                            leadtype="email"
                            >Email</a>
                          <a
                            onClick={this.handleTypeChange}
                            className="w-full block px-2 py-1 hover:cursor-pointer text-black"
                            leadtype="phone"
                            >Phone</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <InputMask
                    mask={this.state.type === "phone" ? "1 \\(999\\) 999-9999 \\ext. 9999" : '' }
                    onChange={this.handleInputChange}
                    className="input"
                    name="content"
                    type={this.state.type === "phone" ? "" : 'text'}
                    value={this.state.content}
                    placeholder={this.state.type === "email" ? "Email address" : "Phone number"} />
                </div>
                <div className="mb-2">
                  <button className="button-green">
                    { this.state.leadSubmitted ? 'Thank you, we\'ll be in touch' : 'Submit' }
                    <span className="action-button-overlay"></span>
                  </button>
                </div>
              </form>
            )}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default LeadForm
