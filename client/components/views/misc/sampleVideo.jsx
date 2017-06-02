import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import sampleVideo from '../../../assets/sampleVideo.m4v'

class SampleVideo extends Component {
  constructor(){
    super()

    this.state = {
      open: false,
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount(){
    console.log('SPROPS', this.props)
    this.setState({open: true}, () => {
      document.getElementById('sampleVideo').play()
    })
  }

  handleClose(e){
    e.stopPropagation()
    this.props.history.goBack()
    this.setState({open: false})
  }

  render(){
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        <video controls playsInline id="sampleVideo">
          <source src={sampleVideo} type="video/mp4" />
        </video>
      </Dialog>
    )
  }
}

export default SampleVideo
