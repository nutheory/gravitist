import React, { Component } from 'react'
import Intro from './intro'
import About from './about'

class IndexMain extends Component {
  render(){
    return(
      <div>
        <Intro />
        <About />
      </div>
    )
  }
}

export default IndexMain
