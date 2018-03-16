// @flow
import React, { Component } from 'react'
import Hero from './hero'
import HowItWorks from './how_it_works'
import HardSell from './hard_sell'
import Stats from './stats'


class Works extends Component<void, void> {
  constructor(){
    super()
  }

  render(){
    return(
      <div className="relative flex flex-col w-full">
        <Hero />
        <HowItWorks />
        <HardSell />
        <Stats />
      </div>
    )
  }
}

export default Works
