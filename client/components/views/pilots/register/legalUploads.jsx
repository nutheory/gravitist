mport React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
import { css } from 'aphrodite'
import Header from '../../misc/header'
import su from '../styles/signup'
import cL from '../../../../styles/commonLayout'

class Signup extends Component {
  constructor(){
    super()
  }

  render(){
    let dropzoneRef
    return (
      <div className={css(cL.wrapper)}>
        <Header title="Signup to Fly" />​
        <div>
           <Dropzone ref={(node) => { dropzoneRef = node }} onDrop={(accepted, rejected) => { alert(accepted) }}>
               <p>Drop files here.</p>
           </Dropzone>
           <button type="button" onClick={() => { dropzoneRef.open() }}>
              Open File Dialog
           </button>
        </div>
      </div>
    )
  }
}

export default Signup
