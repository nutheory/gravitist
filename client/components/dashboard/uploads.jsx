import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
import { css } from 'aphrodite'
import styles from './styles/uploads'
import Upload from 'material-ui/svg-icons/file/cloud-upload'

class UploadPhoto extends Component{

  constructor() {
    super()
    this.state = {
      photos: [],
      videos: []
    }
  }

  showPreview(){
    // if(this.state){
    //   return (<img src={this.state} className={css(reg.avatar)} />)
    // }
    // return <Person className={css(reg.avatar)} />
  }

  async addPhotos(photos){
    this.setState({photos: photos}, (res) => {
      const photoAssets = new FormData()

    })
  }

  render(){
    let dropzoneRef
    return(
      <div>
        <Dropzone
          className={css(styles.PhotoDrop)}
          accept="image/jpeg, image/png, image/jpg, image/gif"
          ref={(node) => { dropzoneRef = node }}
          onDrop={this.addPhotos}
        >
          <Upload className={css(styles.UploadIcon)} />
          <p>Drag or Click here.</p>
          {this.showPreview()}
        </Dropzone>
      </div>
    )
  }
}

export default UploadPhoto
