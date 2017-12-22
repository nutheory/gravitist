import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { css } from 'aphrodite'
import { withProps } from 'recompose'
import Header from '../../misc/header'
import AssetUpload from '../../../utils/asset_uploader'
import reg from '../styles/register'
import cL from '../../../styles/common_layout'

class Uploads extends Component {
  constructor(){
    super()
    this.state = {
      preview: null,
    }
    this.avatarUpload = this.avatarUpload.bind(this)
    this.showPreview = this.showPreview.bind(this)
  }

  async avatarUpload(file){
    this.setState({preview: file[0].preview}, res => {
      console.log('ss',res)
    })
    const avatarAsset = new FormData()
    avatarAsset.append('asset', file[0])
    const resolved = await AssetUpload(avatarAsset)
    return resolved
  }

  showPreview(){
    if(this.state.preview){
      return (<img src={this.state.preview} className={css(reg.avatar)} />)
    }
    // return <Person className={css(reg.avatar)} />
  }

  render(){
    let dropzoneRef
    return (
      <div>
        <div>
          {/* <Dropzone
            className={css(reg.avatarArea)}
            accept="image/jpeg, image/png, image/jpg, image/gif"
            ref={(node) => { dropzoneRef = node }}
            onDrop={this.avatarUpload}
          >
            {this.showPreview()}
          </Dropzone> */}
        </div>
        <Header title="Signup to Fly" />​
        <div className="columns">
          <div className="column is-half">
            {/* <Dropzone
              className={css(reg.uploadArea)}
              ref={(node) => { dropzoneRef = node }}
              onDrop={(accepted, rejected) => { alert(accepted) }}
            >
              <article className="media">
                <figure className="media-left">
                  <Upload className={css(reg.uploadIcon)} />
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Pilot License</strong>
                      <br />
                      Click or Drag & Drop file here.
                    </p>
                  </div>
                </div>
              </article>
            </Dropzone> */}
          </div>
          <div className="column">
            {/* <Dropzone
              className={css(reg.uploadArea)}
              ref={(node) => { dropzoneRef = node }}
              onDrop={(accepted, rejected) => { alert(accepted) }}
            >
              <article className="media">
                <figure className="media-left">
                  <Upload className={css(reg.uploadIcon)} />
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Pilot Insurance</strong>
                      <br />
                      Click or Drag & Drop file here.
                    </p>
                  </div>
                </div>
              </article>
            </Dropzone> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Uploads
