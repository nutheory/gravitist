// @flow
import React from 'react'
import { css } from 'aphrodite'
import atr from './styles/avatar'

type Props = {
  size?: 'large' | 'medium' | 'small',
  src?: string,
  utype?: string,
}

const Avatar = (props: Object) => {
  const size = props.size || 'medium'
  return (
    <figure className={`${css(atr.image, atr[size])}`}>
      { props.src ?
        <img src={ props.src } className={css(atr.imgTag, atr[`img${size}`])} />
        :
        <img src={'/' + require(`../../assets/avatars/${Math.floor(Math.random() * (12 - 1 + 1)) + 1}.png`) }
          className={css(atr.imgTag, atr[`img${size}`])}
        />
      }
    </figure>
  )
}

export default Avatar
