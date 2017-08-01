import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../styles/commonLayout'
import Hero from './hero'
import AerialImagerySells from './aerialImagerySells'
import BirdsEyeView from './birdsEyeView'
import Photos from './photos'
import WhatYouGet from './whatYouGet'
import SampleVideo from './sampleVideo'
import PricingList from '../agent/pricingList'
import Share from './share'
import OurClientsLoveUs from './ourClientsLoveUs'

const Index = (props) => {
  return(
    <div className={css(styles.centerMainContent)}>
      <div>
        <Hero {...props} />
        <AerialImagerySells />
        <BirdsEyeView />
        <Photos />
        <WhatYouGet />
        <SampleVideo />
        <PricingList header={{title: "Our Pricing"}} {...props} />
        <OurClientsLoveUs />
        <Share />
      </div>
    </div>
  )
}

export default Index
