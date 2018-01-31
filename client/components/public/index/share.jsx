// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../header'
import share from './styles/share'
import cL from '../../../styles/common_layout'
import cT from '../../../styles/common_text'

const Share = () => {
  const social = [
    {src: require('../../../assets/svg/facebook.svg'), name: "Facebook"},
    {src: require('../../../assets/svg/twitter.svg'), name: "Twitter"},
    {src: require('../../../assets/svg/instagram.svg'), name: "Instagram"},
    {src: require('../../../assets/svg/tumblr.svg'), name: "Tumbler"},
    {src: require('../../../assets/svg/snapchat.svg'), name: "Snapchat"}
  ]
  return (
    <div className={css(cL.wrapper)}>
      <Header title="Share Your Videos" />
      <div className={css(share.innerContainer)}>
      {social.map((s, i) => {
        return (
          <div key={`pill_${i}`} className={css(share.pill)}>
            <div className={css(share.icon)}><img src={s.src} alt={`${s.name}`} className={css(share.iconImg)} /></div>
            <div className={css(share.text)}>{s.name}</div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Share
