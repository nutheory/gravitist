import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Pricing from '../agent/pricing_list'
import styles from '../../styles/common_layout'
import Intro from './intro'
import HowItWorks from './how_it_works'
import HardSell from './hard_sell'
import QuickStats from './quick_stats'


class Works extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(styles.centerMainContent)}>
        <Intro />
        <HowItWorks />
        <HardSell />
        <Pricing header={{
          title: "Stay one step ahead of your competition and boost your business",
          text: "It’s easy—select the right package and get started!"
        }} />
        <QuickStats />
      </div>
    )
  }
}

export default Works
