import React, { Component } from 'react'
import { css } from 'aphrodite'
import sv from './styles/sampleVideo'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import sampleVideo from '../../assets/sampleVideo.m4v'

const styleModal = {
  width: '80%',
  maxWidth: '1080px',
}

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
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
        document.getElementById('sampleVideo').play()
      }, 400)
    })
  }

  handleClose(){
    this.setState({open: false}, (res) => {
      this.props.history.goBack()
    })
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
        actions={actions}
        modal={false}
        contentStyle={styleModal}
        className={css(sv.modalInner)}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <video controls playsInline id="sampleVideo" style={{width:'100%'}}>
          <source src={sampleVideo} type="video/mp4" />
        </video>
      </Dialog>
    )
  }
}

export default SampleVideo
