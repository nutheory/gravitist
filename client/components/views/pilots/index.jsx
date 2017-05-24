import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../../styles/cssUtils'
import Hero from './hero'
import HowItWorks from './howItWorks'

class Pilots extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <Hero />
        <HowItWorks />
      </div>
    )
  }
}

export default Pilots
