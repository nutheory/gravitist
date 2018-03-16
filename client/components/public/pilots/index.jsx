// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Hero from './hero'
import HowItWorks from './how_it_works'
import Stories from './stories'
import Photos from './photos'
import YoureInCharge from './youre_in_charge'

const Pilots = () => {
  return(
    <div className="relative flex flex-col w-full">
      <div>
        <Hero />
        <HowItWorks />
        <Photos />
        <YoureInCharge />
        <Stories />
      </div>
    </div>
  )
}

export default Pilots
