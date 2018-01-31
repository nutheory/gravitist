// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import cF from '../../styles/common_forms'

type Props = {
  verified: boolean,
  text: string
}

const FormHeader = (props: Props) => {
  return (
    <h4 className={css(cF.subtitle)}>{ props.text }
      <span className={`${css(cF.check)} icon is-small is-right`}
        style={{opacity: `${ props.verified ? 1 : 0 }` }}>
        <i className="fa fa-check"></i>
      </span>
    </h4>
  )
}

export default FormHeader
