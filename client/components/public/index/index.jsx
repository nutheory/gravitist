// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Hero from './hero'
import Benefits from './benefits'
import BirdsEyeView from './birds_eye_view'
import Photos from './photos'
import Features from './features'
import SampleVideo from './sample_video'
import Share from './share'
import OurClientsLoveUs from './our_clients_love_us'

const Index = (props: Object) => {
  return(
    <div className="">
      <Hero {...props} />
      <Benefits />
      <Photos />
      <Features />
      <OurClientsLoveUs />
      <BirdsEyeView />
      <Share />
    </div>
  )
}

export default Index
