import React, {Component} from 'react'
import Config from '../../../api/config'
import { StyleSheet, css } from 'aphrodite'
import cF from '../../styles/common_forms'
import style from './styles/payment'


class Payment extends Component{
  constructor(){
    super()

    // this.stripe = Stripe(Config.stripe.publishable_key)
    // this.elements = this.stripe.elements()
  }

  componentDidMount(){
    // this.card = this.props.stripeElements.create('card', {
    //   iconStyle: 'solid',
    //   style: {
    //     base: {
    //       iconColor: '#8898AA',
    //       color: 'black',
    //       lineHeight: '36px',
    //       fontWeight: 300,
    //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //       fontSize: '19px',
    //
    //       '::placeholder': {
    //         color: '#8898AA',
    //       },
    //     },
    //     invalid: {
    //       iconColor: '#e85746',
    //       color: '#e85746',
    //     }
    //   },
    //   classes: {
    //     focus: 'is-focused',
    //     empty: 'is-empty',
    //   },
    // })
    console.log('mounting card', this.props.stripeElements)
    // this.card.mount('#card-element')
  }

  render(){
    return(
      <div className={css(style.container)}>
        <div className={css(style.cardInfo)}>
          <div>
            {/* <TextValidator
              name="name"
              validations={{
                minLength: 2,
              }}
              required={true}
              // validationErrors={{
                // minLength: "Must enter name as it appears on card",
              // }}
              className={css(cF.element)}
              onChange={this.handleCardNameChange}
              label="Name on Card"
            /> */}
          </div>
          <div>
            {/* <div id="card-element" className="field is-empty"></div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Payment
