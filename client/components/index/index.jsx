import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../styles/common_layout'
import Hero from './hero'
import AerialImagerySells from './aerial_imagery_sells'
import BirdsEyeView from './birds_eye_view'
import Photos from './photos'
import WhatYouGet from './what_you_get'
import SampleVideo from './sample_video'
import PricingList from '../agent/pricing_list'
import Share from './share'
import OurClientsLoveUs from './our_clients_love_us'

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
