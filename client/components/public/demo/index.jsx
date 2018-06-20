// @flow
import React, { Component, Node } from 'react'
import Hero from './hero'
import Demo from './demo'
// import HardSell from './hard_sell'
// import Stats from './stats'


class Sample extends Component<void, void> {

  jumpStart: Function
  demo: Node

  constructor(){
    super()

    this.jumpStart = this.jumpStart.bind(this)
  }

  jumpStart(){
    this.demo.scrollIntoView({behavior: "smooth", block: "start"})
  }

  render(){
    return(
      <div className="relative flex flex-col w-full">
        <Hero jumpStart={this.jumpStart} />
        <Demo demoRef={node => this.demo = node} />
        {/* <HardSell />
        <Stats /> */}
      </div>
    )
  }
}

export default Sample
