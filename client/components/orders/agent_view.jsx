// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import Moment from 'moment'
import NoteList from '../notes/list'
import CollectedContacts from './collected_contacts'
import views from './styles/views'
import Plans from '../../utils/pricing_plans.json'
const linkToReceipt = `https://dashboard.stripe.com/${ process.env.NODE_ENV === "production" ? '' : 'test/' }payments/`

type Props = {
  order: Object
}

type State = {
}

class AgentView extends Component<Props, State> {

  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state = {

    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(){}

  render(){
    const order = this.props.order
    const plan = find(propEq('name', order.plan))(Plans)
    return(
      <div>
        <h1 className={`${css(views.pageTitle)} title is-4`}>{ order.completedAt ? 'Completed order' :'Order in progress' }</h1>
        <div className={`columns`}>
          <div className={`${css(views.addressHeader)} column`}>
            <div className={`${css(views.addressOneTwoHeader)}`}>
              { order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }
            </div>
            <div className={`${css(views.cityStateZip)}`}>
              { order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }
            </div>
          </div>
          <div className="column is-narrow">
            <div className={css(views.smallTitle)}>Created</div>
            <div className={`${css(views.dateHeader)}`}>{ Moment(Date.parse(order.createdAt)).format('MMM Do YYYY') }</div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className={css(views.blueArea)}>
              <div className={css(views.smallTitle)}>Receipt ID</div>
              <div className={`${css(views.bigText)}`}>
                <a href={`${linkToReceipt}${order.receiptId}`}
                  target="_blank"
                  className={css(views.receiptIdLink)}>{order.receiptId}</a>
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div className={css(views.blueArea)}>
              <div className={css(views.smallTitle)}>Plan</div>
              <div className={`${css(views.bigText)}`}>{ plan ? plan.title : null }</div>
            </div>
          </div>
        </div>
        { order.status !== 'approved_completed' ?
          <div>
            <div className={`title is-5 ${css(views.notesHeader)} `}>Notes on filming</div>
            <div>
              <NoteList
                notes={ order.notes }
                modelId={ order.id }
                model="order"
                placeholderText="Special Instructions. ie. Gate codes, Area to film from"
              />
            </div>
            <div className={`${css(views.videoPreview)}`}>
              <div className={`${css(views.videoPreviewCenter)} columns`}>
                <div className={`${css(views.filmIcon)} column`}>
                  <i className="fa fa-film fa-3x" />
                </div>
                <div className={`column`}>
                  <div className={`${css(views.smallTitle)}`}>Status</div>
                  <div className={`${css(views.statusText)}`}>{ order.status }</div>
                </div>
              </div>
            </div>
          </div>
        : <div>
          <div className="columns">
            <div className="column">
              <CollectedContacts contacts={ order.contacts } />
            </div>
          </div>
        </div> }
      </div>
    )
  }
}

export default AgentView
