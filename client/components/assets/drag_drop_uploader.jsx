// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { css } from 'aphrodite'
import { contains } from 'ramda'
import Config from '../../utils/config'
import Evaporate from 'evaporate'
import Axios from 'axios'
import Crypto from 'crypto'
import jwtDecode from 'jwt-decode'
import ProgressBar from './progress_bar'
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import DragDrop from 'drag-drop'
import mimeTypes from '../../utils/mime_types.js'
import styles from './styles/drag_drop_uploader'
import cE from '../../styles/common_elements'
const Buffer = require('buffer').Buffer
if(window.location.host.includes("homefilming.com")){
  env = "production"
} else if(window.location.host.includes("herokuapp.com")){
  env = "staging"
} else {
  env = "development"
}
const host = Config.base_url[env]
const aws = Config.aws.accessKeyId

type Props = {
  padding?: boolean,
  circle?: boolean,
  header: string,
  fileTypeName: string,
  multiple?: boolean,
  source: string,
  uploadMethod?: string,
  fieldname: string,
  endpoint: string,
  uploadToId?: number,
  auth?: Object,
  auto?: boolean,
  mimes: 'images' | 'videos' | 'documents',
  returnUploadInstance: Function
}

type State = {
  preview?: Object,
  previewInfo?: Object,
  evaporateConfig?: Object,
  uploadS3?: Object,
  uploadProgress: number,
  showSubmitForReview: boolean,
  showProgressBar: boolean,
  uploadCompleted: boolean
}

class DragDropUploader extends Component<Props, State> {

  addFileObjsToUppy: Function
  handleDrop: Function
  uploadProgress: number
  showProgressBar: Function
  renderPreview: Function
  onBrowseClick: Function
  onInputChange: Function
  handleReviewSubmit: Function
  checkDragDropSupport: Function
  uppy: Object
  dropzone: ?HTMLDivElement
  inputElement: ?HTMLInputElement

  constructor(){
    super()

    this.state = {
      showSubmitForReview: false,
      showProgressBar: false,
      uploadProgress: 0,
      uploadCompleted: false
    }

    this.uppy = {}
    this.addFileObjsToUppy = this.addFileObjsToUppy.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.uploadProgress = 0
    this.renderPreview = this.renderPreview.bind(this)
    this.onBrowseClick = this.onBrowseClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
    this.checkDragDropSupport = this.checkDragDropSupport.bind(this)
  }

  componentDidMount(){
    this.handleDrop()
    this.uppy = Uppy({
      id: this.props.source,
      meta: {
        source: this.props.source,
        instanceOf: this.props.fieldname,
        uploadToId: this.props.uploadToId },
      restrictions: { allowedFileTypes: mimeTypes[this.props.mimes] },
      autoProceed: this.props.auto || false,
      onBeforeFileAdded: (current, files) => {
        if(mimeTypes[this.props.mimes].indexOf(current.type) === -1){
          alert(`The ${this.props.mimes.slice(0, -1)} 'type' you tried to add is not supported. Please upload one of the following types ${mimeTypes[this.props.mimes]}.`)
        }
      }
    })

    this.uppy.use(XHRUpload, {
      endpoint: this.props.endpoint,
      fieldName: this.props.fieldname,
      headers: {
        'authorization': localStorage.getItem('hf_auth_header_token')
      }
    })

    this.uppy.run()
  }

  checkDragDropSupport(){
    const div = document.createElement('div')
    if (!('draggable' in div) || !('ondragstart' in div && 'ondrop' in div)) { return false }
    if (!('FormData' in window)) { return false }
    if (!('FileReader' in window)) { return false }
    return true
  }

  async generatePreview(file: Object){
    if(file.size < 40000000 && this.props.auto !== true && this.props.mimes !== "documents" ){
      const reader = new FileReader()
      const tmpThis = this
      reader.onload = (e) => {
        tmpThis.setState({ preview: e.target.result, previewInfo: file })
      }
      reader.readAsDataURL(file)
    } else {
      this.setState({ previewInfo: file })
    }
  }

  renderPreview(){
    if(this.state.previewInfo && contains(this.state.previewInfo.type, mimeTypes['images'])){
      return (
        <div id={`preview${this.props.source}`} className="w-full h-full">
          <img src={this.state.preview} className={`h-full w-full ${ this.props.circle ? 'circle' : '' }`} />
          <div
            className={` ${ this.props.circle ? 'edit-upload-overlay-circle' : 'edit-upload-overlay' }`}
            onClick={this.onBrowseClick}><i className="far fa-edit"></i></div>
        </div>
      )
    } else if (this.state.previewInfo && contains(this.state.previewInfo.type, mimeTypes['videos'])) {
      return (
        <div id={`preview${this.props.source}`} className="w-full h-full">
          <video width='100%' className="rounded-lg border border-grey-dark" controls>
            <source src={this.state.preview} type='video/mp4' />
          </video>
          <div
            className={` ${ this.props.circle ? 'edit-upload-overlay-circle' : 'edit-upload-overlay' }`}
            onClick={ this.onBrowseClick }><i className="far fa-edit fa-2x"></i></div>
        </div>
      )
    } else {
      return (
        <div id={`preview${this.props.source}`} className="">
          <i className="fas fa-check fa-4x"></i>
          <div
            className={` ${ this.props.circle ? 'edit-upload-overlay-circle' : 'edit-upload-overlay' }`}
            onClick={ this.onBrowseClick }><i className="far fa-edit fa-2x"></i></div>
        </div>
      )
    }
  }

  handleDrop(){
    DragDrop(this.dropzone, {
      onDrop: (files, pos) => {
        this.generatePreview(files[0])
        this.addFileObjsToUppy(files)
      },
      onDragEnter: () => { if(this.dropzone){ this.dropzone.classList.add(css(styles.mainDragDropContainerHover)) } },
      onDragLeave: () => { if(this.dropzone){ this.dropzone.classList.remove(css(styles.mainDragDropContainerHover)) } }
    })
  }

  onInputChange(e: SyntheticInputEvent<*>){
    const files = Array.prototype.slice.call((e.currentTarget: HTMLInputElement).files)
    this.generatePreview(files[0])
    this.addFileObjsToUppy(files)
  }

  onBrowseClick(){
    if(this.inputElement){ this.inputElement.click() }
  }

  addFileObjsToUppy(files: Array<Object>){
    files.forEach((file: Object) => {
      this.uppy.addFile({
        source: this.props.source,
        name: file.name,
        lastModified: file.lastModified,
        type: file.type,
        data: file })
    })
    if(this.props.uploadMethod === 'S3'){
      this.setState({
        showSubmitForReview: true,
        uploadS3: files[0],
        evaporateConfig: {
          signerUrl: `${host}/auth-signature`,
          signHeaders: { Authorization: localStorage.getItem('hf_auth_header_token') },
          aws_key: aws,
          aws_url: 'https://s3.us-west-1.amazonaws.com',
          awsRegion: 'us-west-1',
          bucket: 'homefilming',
          // s3FileCacheHoursAgo: 3,
          // allowS3ExistenceOptimization: true,
          computeContentMd5: true,
          cryptoMd5Method: (data) => Crypto.createHash('md5').update(Buffer.from(data)).digest('base64'),
          cryptoHexEncodedHash256: (data) => Crypto.createHash('sha256').update(data).digest('hex')
        } })
      this.props.returnUploadInstance({ hideIrrelevant: true })
    } else {
      this.props.returnUploadInstance(this.uppy)
    }
  }

  handleReviewSubmit(){
    const ths = this
    const state = this.state
    return Evaporate.create(state.evaporateConfig)
      .then(evaporate => {
        const file = new File([""], "file_object_to_upload")
        const addConfig = {
          name: state.uploadS3 ? `${env === "production" ? '' : 'development/'}${this.props.endpoint}` : null,
          file: state.uploadS3,
          started: () => { ths.setState({ showProgressBar: true, showSubmitForReview: false }) },
          progress: (progressValue) => { ths.setState({ uploadProgress: progressValue }) },
          complete: (_xhr, awsKey) => {
            ths.setState({ uploadCompleted: true }, () => {
              this.props.returnUploadInstance({ hideIrrelevant: true, showUploadSuccess: true, keyUrl: awsKey })
            })
          }
          // error: (msg) => { ths.setState({ showProgressBar: false, showSubmitForReview: true }) }
        }
        evaporate.add(addConfig)
          .then((awsObjectKey) => { console.log('File successfully uploaded to:', awsObjectKey)
            }, (reason) => { console.log('File did not upload sucessfully:', reason) })
      })
  }

  render(){
    return (
      <div className="h-full" >
        { this.state.showProgressBar ?
          <div className={`h-full`}>
            <ProgressBar progress={ this.state.uploadProgress } />
          </div>
        :
          <div
            ref={ dropzone => this.dropzone = dropzone }
            className={`${ this.props.circle ? 'circle h-full' : 'rounded-lg' } ${this.props.padding ? 'p-4' : '' } ${this.state.showSubmitForReview ? 'padding-override' : 'upload-container'} relative`}
          >
            <form className={`h-full w-full`}>
              <input
                ref={ input => this.inputElement = input }
                className={css(styles.hiddenDragDropInput)}
                type="file"
                name="files[]"
                value=""
                multiple={this.props.multiple || false}
                onChange={this.onInputChange} />
            { this.state.preview ? this.renderPreview() :
              <div className={`h-full`}>
                <div className={`h-full`}>
                  { this.state.previewInfo ?
                    <div className="flex">
                      <div className="mr-4"><i className="text-green-dark fas fa-check fa-2x"></i></div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold">Got it</h3>
                        <p className="text-sm">{this.props.auto !== true ? 'Ready to upload...' : 'Uploaded' }</p>
                      </div>
                    </div>
                  : <div className={`flex ${ this.props.circle ? 'flex-wrap justify-center items-center h-full' : '' }`}>
                    <div className={`${ this.props.circle ? '' : 'flex' }`}>
                      <div className={`${ this.props.circle ? 'w-full text-center my-2 self-center' : 'mr-4' }`}>
                        <i className={`${this.props.mimes === 'documents' ? 'far fa-file-pdf' : 'fas fa-cloud-upload-alt' } fa-2x`}></i>
                      </div>
                      <div className={`${ this.props.circle ? 'w-2/3 m-auto' : '' }`}>
                        <h3 className={`${ this.props.circle ? 'my-2 text-center' : '' } text-sm font-bold`}>{ this.props.header }</h3>
                        <p className={`${ this.props.circle ? 'text-center' : '' } text-xs`}>Drag & drop { this.props.fileTypeName } or click to browse</p>
                      </div>
                    </div>
                  </div> }
                </div>
                <label className="block absolute pin-t pin-l w-full h-full cursor-pointer z-10" onClick={ this.onBrowseClick }></label>
              </div> }
            </form>
          </div> }

          { this.state.showSubmitForReview ?
            <div className="mt-4">
              <button className="button-green" onClick={ this.handleReviewSubmit }>
                <span className="action-button-overlay"></span>Submit for review
              </button>
            </div>
          : null }

      </div>
    )
  }

}

export default DragDropUploader
