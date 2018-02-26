// @flow
import React from 'react'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import cnt from './styles/contact'
import ContactTypes from '../../utils/contact_types.js'


const ContactDisplay = (props: Object) => {
  const contact = find(propEq('type', props.contact.type))(ContactTypes)
  return (
    <div className={`${ props.center ? 'text-center' : ''}`} >
      { contact ?
        <span>
          { contact.useText || props.noIcons ?
            <span>
              <strong>{ contact.humanized } </strong>
            </span>
            : <i className={`${contact.icon} ${css(cnt.subduedIcon)}`} /> }
          { contact.ext ? <a href={`${contact.ext}:${props.contact.content}`}>{ contact.formatter ? contact.formatter(props.contact.content) : props.contact.content }</a>
            : `${ props.contact.content }` }
        </span>
      : null }
    </div>
  )
}

export default ContactDisplay
