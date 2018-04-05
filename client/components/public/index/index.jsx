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

type Props = {

}

type State = {

}

class Index extends Component<Props, State> {

  jumpStart: Function
  benefits: Node

  constructor(props: Object){
    super(props)

    this.state ={

    }

    this.jumpStart = this.jumpStart.bind(this)
  }

  jumpStart(){
    this.benefits.scrollIntoView({behavior: "smooth"})
  }

  render(){
    return(
      <div className="">
        <Hero {...this.props} jumpStart={this.jumpStart} />
        <Benefits benefitsRef={node => this.benefits = node} />
        <Photos />
        <Features />
        <OurClientsLoveUs />
        <BirdsEyeView />
        <Share />
      </div>
    )
  }
}

export default Index
