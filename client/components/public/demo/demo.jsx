// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Config from '../../../utils/config'
import { getEnv } from '../../../utils/helpers'
const env = getEnv(window.location.host)
const baseUri = Config.base_url[env]
const galleryUuid = () => {
  if (env === 'development') { return 'db39a52d-20be-45ec-a99a-211b4e394628' }
  else if (env === 'production') { return 'd131bd88-e5d2-4d0c-9e3f-aed2c9267a4b' }
  else if (env === 'staging') { return 'd131bd88-e5d2-4d0c-9e3f-aed2c9267a4b' }
}

type Props = {
  demoRef: Node
}

type State = {}

class Demo extends Component<Props, State> {

  // resizeIframe: Function
  obj: Object

  constructor(props: Object) {
   super(props)

   this.obj = React.createRef()
  }

  render(){
    const uuid = galleryUuid()
 
    return (
      <div className="w-full h-full" style={{height: `${window.innerWidth < 760 ? 110 : 78}rem`}} ref={this.props.demoRef}>
        <iframe className="w-full h-full" scrolling="no" src={`${baseUri}/gallery/${ uuid ? uuid : '' }`} ref={node => this.obj = node}></iframe>
      </div>
    )
  }
}

export default Demo
