// @flow
import React, { Component, Node } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Hero from './hero'
import WhyFly from './why_fly'
import HowItWorks from './how_it_works'
// import Stories from './stories'
// import Photos from './photos'
import YoureInCharge from './youre_in_charge'

type Props = {

}

type State = {

}

class Index extends Component<Props, State> {

  jumpStart: Function
  whyFly: Node

  constructor(props: Object){
    super(props)

    this.state ={

    }

    this.jumpStart = this.jumpStart.bind(this)
  }

  jumpStart(){
    this.whyFly.scrollIntoView({behavior: "smooth"})
  }

  render(){
    return(
      <div className="relative flex flex-col w-full">
        <div>
          <Hero jumpStart={this.jumpStart} />
          <WhyFly whyFlyRef={node => this.whyFly = node} />
          <HowItWorks />
          {/* <Photos /> */}
          <YoureInCharge />
          {/* <Stories /> */}
        </div>
      </div>
    )
  }
}

export default Index
