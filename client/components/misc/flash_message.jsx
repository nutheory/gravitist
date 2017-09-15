import React, { Component } from 'react'

class FlashMessage extends Component {
  constructor(){
    super()
    this.state = {
      isHidden: true
    }

    this.closeMessage = this.closeMessage.bind(this)
  }

  componentDidMount(){
    if(this.props.message === true){
      this.setState({ isHidden: false })
    }
  }

  closeMessage(){
    this.setState({ isHidden: true })
  }

  render(){
    return(
      <div className={`${!this.state.isHidden ? visibleMessage : hiddenMessage }`} onClick={this.closeMessage}>
        <p className={`is-success ${css(styles.infoAlert)}`}>Welcome, {this.props.user.name}</p>
      </div>
    )
  }
}

export default FlashMessage
