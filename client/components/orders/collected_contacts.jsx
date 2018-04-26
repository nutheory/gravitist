// @flow
import React, { Component } from 'react'
import { dateTimeShort } from '../../utils/helpers'

const CollectedContacts = (props: Object) => {
  return(
    <div className="border border-grey-darker p-2">
      <div className="font-bold">Collected Contacts</div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/3 text-left text-xs">Name</th>
            <th className="w-1/3 text-left text-xs">Phone/Email</th>
            <th className="w-1/3 text-left text-xs">Info requested at</th>
          </tr>
        </thead>
        <tbody>
          { props.contacts.map((cnt, i) => (
            <tr key={`contact_${i}`} className="">
              <td className="">{cnt.name}</td>
              <td className="">
                { cnt.type === "email" ?
                <a href={`mailto:${cnt.content}`}>{cnt.content}</a>
                : cnt.content }
              </td>
              <td className="">{dateTimeShort(cnt.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CollectedContacts
