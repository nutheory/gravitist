// @flow
import React from 'react'
import { css } from 'aphrodite'
import { find, propEq } from 'ramda'
import cnt from './styles/contact'
import ContactTypes from '../../utils/contact_types.js'

type Props = {
  contact: Object,
  size?: string
}

const ContactDisplay = (props: Object) => {
  const size = props.size || 'medium'
  const contact = find(propEq('type', props.contact.type))(ContactTypes)
  return (
    <div className={css(cnt[`${size}Display`])}>
      { contact ?
        <span>
          { contact.useText ?
            `${ contact.humanized }: `
            : <i className={`fa fa-${contact.icon} ${css(cnt.subduedIcon)}`} /> }
          { contact.ext ? <a href={`${contact.ext}:${props.contact.content}`}>{props.contact.content}</a>
            : `${ props.contact.content }` }
        </span>
      : null }
    </div>
  )
}

export default ContactDisplay
