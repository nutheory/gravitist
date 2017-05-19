import React, {Component} from 'react'
import CardReactFormContainer from 'card-react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'
import MenuItem from 'material-ui/MenuItem'
import { StyleSheet, css } from 'aphrodite'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Mutation from '../../mutations/payment'
import RaisedButton from 'material-ui/RaisedButton'
import layout from './styles/layout'
import style from './styles/styling'
import './styles/card.css'


class CustomerPayment extends Component{
  constructor(){
    super()
    this.state = {
      number: "",
      expires: "",
      cvv: "",
      name: " "
    }

    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  enableButton(){
    this.setState({ canSubmit: true })
  }

  disableButton(){
    this.setState({ canSubmit: false })
  }

  handleSubmit(evt){
    this.props.mutate({variables: {name, email, password, type,}})
  }

  render(){
    return(
      <div>
        <div id="card-wrapper"></div>
        <Formsy.Form
          onInvalid={this.disableButton}
          onValid={this.enableButton}
          onSubmit={this.handleSubmit}
        >
        <CardReactFormContainer
          container="card-wrapper"
        >
          <fieldset className={css(layout.fieldPadding)}>
            <div className={css(layout.fieldRow)}>
              <div className={css(layout.multiColumnEvenSize)}>
                <FormsyText
                  name="number"
                  className={css(style.textfieldFullSize)}

                  hintText="Card Number"
                  floatingLabelText="Card Number"
                />
              </div>
              <div className={css(layout.multiColumnEvenSize)}>
                <FormsyText
                  name="name"
                  className={css(style.textfieldFullSize)}

                  hintText="Name on Card"
                  floatingLabelText="Name on Card"
                />
              </div>
            </div>
            <div className={css(layout.fieldRow)}>
              <div className={css(layout.multiColumnEvenSize)}>
                <FormsyText
                  name="expiry"
                  className={css(style.textfieldFullSize)}
                  hintText="Expires"
                  floatingLabelText="Expires"
                />
              </div>
              <div className={css(layout.multiColumnEvenSize)}>
                <FormsyText
                  name="cvc"
                  className={css(style.textfieldFullSize)}
                  hintText="CVV"
                  floatingLabelText="CVV"
                />
              </div>
            </div>
          </fieldset>
        </CardReactFormContainer>
        <fieldset className={css(layout.fieldPadding)}>
          <RaisedButton
            type="submit"
            label="Submit Payment"
            primary={ true }
            fullWidth={ true }
            disabled={ !this.state.canSubmit }
          />
        </fieldset>
      </Formsy.Form>
    </div>
    )
  }
}

export default CustomerPayment
