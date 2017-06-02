import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Pricing from '../agent/pricingList'
import styles from '../../../styles/commonLayout'
import Intro from './intro'


class Works extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(styles.centerMainContent)}>
        <Intro />
        <Pricing header={{
          title: "Stay one step ahead of your competition and boost your business",
          text: "It’s easy—select the right package and get started!"
        }} />
      </div>
    )
  }
}

export default Works
