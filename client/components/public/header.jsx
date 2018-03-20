// @flow
import React from 'react'
import { css } from 'aphrodite'
import header from './styles/header'

const Header = (props: Object) => {

  const subTitle = () => {
    if (props.subtitle) return <h3 className={css(header.subtitle)}>{props.subtitle}</h3>
  }

  const plainText = () => {
    if (props.text) return <p className={css(header.text)}>{props.text}</p>
  }

  return (
    <header className={css(header.container)}>
      <h2 className={css(header.title)}>{props.title}</h2>
      { subTitle() }
      { plainText() }
    </header>
  )
}

export default Header
