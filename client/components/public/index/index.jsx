// @flow
import React, { Component, Node } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Hero from './hero'
import AgentAdvantages from "./advantages"
import Features from "./features"
import InAddition from "./in_addition"
// import Benefits from './benefits'
// import BirdsEyeView from './birds_eye_view'
// import Photos from './photos'
// import Features from './features'
// import SampleVideo from './sample_video'
// import Share from './share'
// import OurClientsLoveUs from './our_clients_love_us'

type Props = {

}

type State = {

}

class Index extends Component<Props, State> {

  jumpStart: Function
  advantage: Node

  constructor(props: Object){
    super(props)

    this.state ={

    }

    this.jumpStart = this.jumpStart.bind(this)
  }

  jumpStart(){
    this.advantage.scrollIntoView({behavior: "smooth"})
  }

  render(){
    return(
      <div className="bg-white">
        <Hero {...this.props} jumpStart={this.jumpStart} />
        <AgentAdvantages advantageRef={node => this.advantage = node} />
        <Features />
        <InAddition />
        {/* <Benefits benefitsRef={node => this.benefits = node} /> */}
        {/* <Photos />
        <Features />
        <OurClientsLoveUs />
        <BirdsEyeView />
        <Share /> */}
      </div>
    )
  }
}

export default Index
