// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  demoRef: Node
}

type State = {}

class Demo extends Component<Props, State> {

  resizeIframe: Function
  obj: Object

  constructor(props: Object) {
   super(props)

   this.obj = React.createRef()
   this.resizeIframe = this.resizeIframe.bind(this)
  }

  resizeIframe(obj: Object){
    console.log(this.obj)
    setTimeout(() => {
      this.obj.style.height = this.obj.contentWindow.document.body.scrollHeight + 'px'
    }, 500)
  }

  render(){
    return (
      <div className="w-full h-full" ref={this.props.demoRef}>
        <iframe className="w-full h-full" scrolling="no" src="https://gravitist.ngrok.io/gallery/db39a52d-20be-45ec-a99a-211b4e394628" ref={node => this.obj = node} onLoad={this.resizeIframe}></iframe>
      </div>
    )
  }
}

export default Demo
