import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Scroll from 'react-scroll'
import styles from '../../../styles/commonLayout'
import Hero from './hero'
import AerialImagerySells from './aerialImagerySells'
import BirdsEyeView from './birdsEyeView'
import Photos from './photos'
import WhatYouGet from './whatYouGet'
import SampleVideo from './sampleVideo'
import Pricing from '../agent/pricingList'
import Order from '../agent/order'
import Share from './share'
import OurClientsLoveUs from './ourClientsLoveUs'
import Works from '../works/intro'

const sLink = Scroll.Link
const Element = Scroll.Element
const Events = Scroll.Events
const scroll = Scroll.animateScroll
const scrollSpy = Scroll.scrollSpy

class Index extends Component {

  render(){
    return(
      <div>
        <div className={css(styles.centerMainContent)}>
          <div>
            <Hero {...this.props} />
            {/* <Works /> */}
            <AerialImagerySells />
            <BirdsEyeView />
            <Photos />
            <WhatYouGet />
            <SampleVideo />
            <Pricing header={{title: "Our Pricing"}} {...this.props} />
            {/* <Router>
              <Element name="ePricing">
                <Route exact path="/" component={Pricing} />
                <Route path="/order/:plan" component={Order} />
              </Element>
            </Router> */}
            <OurClientsLoveUs />
            <Share />
          </div>
        </div>
      </div>
    )
  }
}

export default Index
