// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { find, propEq } from 'ramda'
import { humanize, dateShort } from '../../utils/helpers'
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
        <div className="flex pb-4">
          <div className="flex justify-end items-end"><i className="fas fa-chevron-left"></i><Link to="/orders" className="inline-block pl-2" style={{ lineHeight: '1.1rem' }}>Back to orders</Link></div>
          <div className="flex-1 text-right text-xl font-bold">{ plan ? plan.title : null } - { order.uuid }</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div id={`order_${ order.id }`} className="w-full">
            <div className="w-full flex">
              <div className="flex-1 pt-4">
                <p className="text-xl font-bold">{ order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }</p>
                <p className="text-sm">{ order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }</p>
              </div>
              <div className="ml-4">
                <label className="block text-right text-sm">Status</label>
                <div className="inline-block relative">{ humanize(order.status) }</div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            { order.status !== "approved_completed" ?
              <div className="flex justify-center">
                <div className="flex">
                  <div className="mr-4">
                    <i className="fas fa-home fa-3x"></i>
                  </div>
                  <div className="">
                    <div className="font-bold text-2xl">Coming Soon</div>
                    <p className="">{ humanize(order.status) }</p>
                  </div>
                </div>
              </div>
            : <div className="my-8">
                <CollectedContacts contacts={ order.contacts } />
              </div> }
            <div className="w-full lg:w-3/5 m-auto mt-4 text-center">
            { order.status === "recruiting" ?
              <p>Thank you very much for your order, we got the wheels in motion and have started
                recruiting a pilot. Please take a moment and fill out the listing info.</p>
            : order.status === "filming" ?
              <p>Thank you very much for your order, we recruited a pilot and are awaiting a uploaded video.
                Please take a moment and fill out the listing info.</p>
            : order.status === "approved_completed" ?
              <p className="mb-8">You order has been processed and delivered. check out the your results below.</p>
            : <p>Thank you very much for your order. We are processing, and branding your video... please be patient.</p> }
            </div>
          </div>
          { order.status !== "approved_completed" ?
            <div className="my-8">
              <div className="rounded-lg border border-grey-light bg-grey-lighter p-4">
                <NoteList
                  modelId={ order.id }
                  model="order"
                  title="Add a note about this filming"
                  placeholderText="Special Instructions. ie. Gate codes, Area to film from"
                />
              </div>
            </div>
          : null }
          <div className="flex">
            <div className="flex-1 mr-4">
              <div className="text-sm">Receipt ID</div>
              <div className="">{order.receiptId}</div>
            </div>
            <div className="">
              <div className="text-right text-sm">Created</div>
              <div className="">{ dateShort(order.createdAt) }</div>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //   <h1 className={`${css(views.pageTitle)} title is-4`}>{ order.completedAt ? 'Completed order' :'Order in progress' }</h1>
      //   <div className={`columns`}>
      //     <div className={`${css(views.addressHeader)} column`}>
      //       <div className={`${css(views.addressOneTwoHeader)}`}>
      //         { order.address.address1 } { order.address.address2 ? `, ${ order.address.address2 }` : null }
      //       </div>
      //       <div className={`${css(views.cityStateZip)}`}>
      //         { order.address.city }{ order.address.state ? `, ${ order.address.state }`: null } { order.address.zipCode }
      //       </div>
      //     </div>
      //     <div className="column is-narrow">
      //       <div className={css(views.smallTitle)}>Created</div>
      //       <div className={`${css(views.dateHeader)}`}>{ Moment(Date.parse(order.createdAt)).format('MMM Do YYYY') }</div>
      //     </div>
      //   </div>
      //   <div className="columns">
      //     <div className="column">
      //       <div className={css(views.blueArea)}>
      //         <div className={css(views.smallTitle)}>Receipt ID</div>
      //         <div className={`${css(views.bigText)}`}>
      //           <a href={`${linkToReceipt}${order.receiptId}`}
      //             target="_blank"
      //             className={css(views.receiptIdLink)}>{order.receiptId}</a>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="column is-narrow">
      //       <div className={css(views.blueArea)}>
      //         <div className={css(views.smallTitle)}>Plan</div>
      //         <div className={`${css(views.bigText)}`}>{ plan ? plan.title : null }</div>
      //       </div>
      //     </div>
      //   </div>
      //   { order.status !== 'approved_completed' ?
      //     <div>
      //       <div className={`title is-5 ${css(views.notesHeader)} `}>Notes on filming</div>
      //       <div>
      //         <NoteList
      //           notes={ order.notes }
      //           modelId={ order.id }
      //           model="order"
      //           placeholderText="Special Instructions. ie. Gate codes, Area to film from"
      //         />
      //       </div>
      //       <div className={`${css(views.videoPreview)}`}>
      //         <div className={`${css(views.videoPreviewCenter)} columns`}>
      //           <div className={`${css(views.filmIcon)} column`}>
      //             <i className="fa fa-film fa-3x" />
      //           </div>
      //           <div className={`column`}>
      //             <div className={`${css(views.smallTitle)}`}>Status</div>
      //             <div className={`${css(views.statusText)}`}>{ order.status }</div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   : <div>
      //     <div className="columns">
      //       <div className="column">
      //         <CollectedContacts contacts={ order.contacts } />
      //       </div>
      //     </div>
      //   </div> }
      // </div>
    )
  }
}

export default AgentView
