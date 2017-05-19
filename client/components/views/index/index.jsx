import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../../styles/cssUtils'
import HomeHero from './homeHero'
import AerialImagerySells from './aerialImagerySells'
import BirdsEyeView from './birdsEyeView'
import Photos from './photos'
import WhatYouGet from './whatYouGet'
import SampleVideo from './sampleVideo'
import Pricing from '../agent/pricingList'
import Order from '../agent/order'


class Index extends Component {
  render(){
    return(
      <div>
        <div className={css(styles.centerFlexContent)}>
          <div>
            <HomeHero />
            <AerialImagerySells />
            <BirdsEyeView />
            <Photos />
            <WhatYouGet />
            <SampleVideo />
            <Router>
              <div>
                <Route exact path="/" component={Pricing} />
                <Route path="/order/:plan" component={Order} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

export default Index
