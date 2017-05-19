import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'
import sv from './styles/sampleVideo'
import general from './styles/general'
import sampleVideo from '../../../assets/sampleVideo.m4v'
import sampleImage from '../../../assets/images/sample@2x.jpg'

class SampleVideo extends Component{
  constructor(){
    super()
     this.state = {
       videoLoaded: false
     }

     this.playVideo = this.playVideo.bind(this)
  }

  playVideo(){
    this.setState({ videoLoaded: true }, (res => {
      document.getElementById('sampleVideo').play()
    }))
  }

  render(){
    if (this.state.videoLoaded) {
      return (
        <div className={css(sv.container)}>
          <video controls playsInline className={css(sv.video)} id="sampleVideo">
            <source src={sampleVideo} type="video/mp4" />
          </video>
        </div>
      )
    } else {
      return (
        <div className={css(sv.container)}>
          <div className={css(sv.staticImage)} style={{ background: `url(/${sampleImage}) no-repeat` }} onClick={this.playVideo}></div>
        </div>
      )
    }
  }
}

export default SampleVideo
