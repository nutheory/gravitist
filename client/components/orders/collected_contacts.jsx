// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import Moment from 'moment'
import views from './styles/views'
import cE from '../../styles/common_elements'

const CollectedContacts = (props: Object) => {
  console.log(props)
  return(
    <div className="columns">
      <div className="column">
        <div className="title is-4">Collected Contacts</div>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone/Email</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            { props.contacts.map((cnt, i) => (
              <tr key={`contact_${i}`} className="">
                <td className="">{cnt.name}</td>
                <td className="">{cnt.content}</td>
                <td className="">{cnt.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CollectedContacts
