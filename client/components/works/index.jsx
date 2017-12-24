import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Pricing from '../agent/pricing_list'
import styles from '../../styles/common_layout'
import Hero from './hero'
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
        <Hero />
        <HowItWorks />
        <HardSell />
      </div>
    )
  }
}

export default Works
