import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { FormsyText } from 'formsy-material-ui/lib'
import { StyleSheet, css } from 'aphrodite'
import layout from './styles/layout'
import style from './styles/styling'
import gql from 'graphql-tag'

class Contact extends Component {
  constructor(){
    super()
    this.state = {
      contacts: ""
    }
  }

  addAnotherConact(evt){

  }

  renderContactInstance(){

  }

  render(){
    return (
      <fieldset className={css(layout.fieldPadding)}>
        <h4>Your Contact Info</h4>
        <div ref={(phoneArea) => { this.phoneArea = phoneArea }}>
          <div className={css(layout.fieldRow)}>
            <div className={css(layout.multiColumnEvenSize)}>
              <FormsyText
                name="phone_label"
                // onChange={this.handlePhoneChange.bind(this)}
                value={this.state.phone_mobile}
                className={css(style.textfieldFullSize)}
                hintText="Mobile, Office, Skype, etc."
                floatingLabelText="Phone Number Label"
              />
            </div>
            <div className={css(layout.multiColumnEvenSize)}>
              <div>
                <FormsyText
                  name="phone_number"
                  // onChange={this.handlePhoneChange.bind(this)}
                  value={this.state.phone_mobile}
                  className={css(style.textfieldFullSize)}
                  hintText="Phone Number"
                  floatingLabelText="Phone Number"
                />
              </div>
              <div>
                <FloatingActionButton
                  mini={true}
                  onTouchTap={this.addAnotherNumber()}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
}

export default Contact
