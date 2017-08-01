import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import share from './styles/share'
import cL from '../../styles/commonLayout'
import cT from '../../styles/commonText'
import facebook from '../../assets/svg/facebook.svg'
import twitter from '../../assets/svg/twitter.svg'
import instagram from '../../assets/svg/instagram.svg'
import tumblr from '../../assets/svg/tumblr.svg'
import snapchat from '../../assets/svg/snapchat.svg'

const Share = () => {
  const social = [
    {src: facebook, name: "Facebook"},
    {src: twitter, name: "Twitter"},
    {src: instagram, name: "Instagram"},
    {src: tumblr, name: "Tumbler"},
    {src: snapchat, name: "Snapchat"}
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
