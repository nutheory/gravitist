// @flow
import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import ph from './styles/photos'

const Photos = () => {
  return (
    <div className={css(ph.container)}>
      <div className={css(ph.mainPhoto)} style={{ background: `url(${require('../../../assets/images/drone1@2x.jpg')}) no-repeat`}}>
        <div className={css(ph.message)}>
          <div className={css(ph.messageBg)}></div>
          <div className={css(ph.messageText)}>
            <h2 className={css(ph.header)}>Make great money</h2>
            <p className={css(ph.text)}>You can fly and earn as much as you want. The more you fly, the more you’ll make.</p>
          </div>
        </div>
      </div>
      <div className={css(ph.mainPhoto)} style={{ background: `url(${require('../../../assets/images/drone2@2x.jpg')}) no-repeat`}}>
        <div className={css(ph.message)} style={{ float: 'right' }}>
          <div className={css(ph.messageBg)}></div>
          <div className={css(ph.messageText)}>
            <h2 className={css(ph.header)}>Fly when you want</h2>
            <p className={css(ph.text)}> Only fly when it works for you. Its your business.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Photos
