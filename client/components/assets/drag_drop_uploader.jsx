// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { css } from 'aphrodite'
import { contains } from 'ramda'
import Config from '../../utils/config'
import Evaporate from 'evaporate'
import Axios from 'axios'
import Crypto from 'crypto'
import ProgressBar from './progress_bar'
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import DragDrop from 'drag-drop'
import mimeTypes from '../../utils/mime_types.js'
import styles from './styles/drag_drop_uploader'
import cE from '../../styles/common_elements'
const Buffer = require('buffer').Buffer
const env = window.location.host === "homefilming.com" ? "production" : "development"
const host = Config.base_url[env]
const aws = Config.aws.accessKeyId

type Props = {
  padding?: boolean,
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
      debug: true,
      meta: { source: this.props.source, instanceOf: this.props.fieldname, uploadToId: this.props.uploadToId },
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
    console.log('FILE',file.size)
    if(file.size < 40000000){
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
        <div id={`preview${this.props.source}`} className={css(styles.mainDragDropPreview)}>
          <img src={this.state.preview} />
          <div
            className={css(styles.changeDragDropOverlay)}
            onClick={this.onBrowseClick}><i className="fa fa-pencil fa-2x"></i></div>
        </div>
      )
    } else if (this.state.previewInfo && contains(this.state.previewInfo.type, mimeTypes['videos'])) {
      return (
        <div id={`preview${this.props.source}`} className={css(styles.mainDragDropPreview)}>
          <video width='100%' controls>
            <source src={this.state.preview} type='video/mp4' />
          </video>
          <div
            className={css(styles.changeDragDropOverlay)}
            onClick={this.onBrowseClick}><i className="fa fa-pencil fa-2x"></i></div>
        </div>
      )
    } else {
      return (
        <div id={`preview${this.props.source}`} className={css(styles.noImagePreview)}>
          <i className="fa fa-check fa-4x"></i>
          <div
            className={css(styles.changeDragDropOverlay)}
            onClick={this.onBrowseClick}><i className="fa fa-pencil fa-2x"></i></div>
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
          aws_url: 'http://s3.us-west-1.amazonaws.com',
          awsRegion: 'us-west-1',
          bucket: 'homefilming',
          // s3FileCacheHoursAgo: 3,
          // allowS3ExistenceOptimization: true,
          computeContentMd5: true,
          cryptoMd5Method: (data) => Crypto.createHash('md5').update(Buffer.from(data)).digest('base64'),
          cryptoHexEncodedHash256: (data) => Crypto.createHash('sha256').update(data).digest('hex')
        } })
      this.props.returnUploadInstance({ hideBailOption: true })
    } else {
      this.props.returnUploadInstance(this.uppy)
    }
  }

  handleReviewSubmit(){
    const ths = this
    const state = this.state
    return Evaporate.create(state.evaporateConfig)
      .then(evaporate => {
        console.log('this.state.uploadS3',state.uploadS3)
        const file = new File([""], "file_object_to_upload")
        const addConfig = {
          name: state.uploadS3 ? `${this.props.endpoint}raw-upload` : null,
          file: state.uploadS3,
          started: () => { ths.setState({ showProgressBar: true, showSubmitForReview: false }) },
          progress: (progressValue) => { ths.setState({ uploadProgress: progressValue }) },
          complete: (_xhr, awsKey) => {
            ths.setState({ uploadCompleted: true }, () => {
              this.props.returnUploadInstance({ hideBailOption: true, showUploadSuccess: true, keyUrl: awsKey })
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
      <div className={css(styles.mainDragDropWrapper)} >
        <div
          ref={ dropzone => this.dropzone = dropzone }
          className={css(styles.mainDragDropContainer)}
          style={ this.props.padding ? { padding: '2rem 1rem' } : {} }
        >
          <form className={css(styles.mainDragDropForm)}>
            <input
              ref={ input => this.inputElement = input }
              className={css(styles.hiddenDragDropInput)}
              type="file"
              name="files[]"
              value=""
              multiple={this.props.multiple || false}
              onChange={this.onInputChange} />
          { this.state.preview ? this.renderPreview() :
            <div>
              <div className={css(styles.mainDragDropInstruction)}>
                <i className={`${css(styles.mainDragDropIcon)} fa fa-${this.props.mimes === 'documents' ? 'file-text-o' : 'cloud-upload' } fa-2x`}></i>
                <h3 className={css(styles.mainDragDropHeader)}>{this.props.header}</h3>
                <p className={css(styles.mainDragDropText)}>Drag & drop {this.props.fileTypeName} or click to browse</p>
              </div>
              <label className={css(styles.clickableDragDropLabel)} onClick={this.onBrowseClick}></label>
            </div> }
          </form>
        </div>
        <div>
          { this.state.showSubmitForReview ?
            <div className={css(styles.reviewButton)}>
              <a className={`${css(cE.ctaButton, cE.ctaGreen)}`} onClick={ this.handleReviewSubmit }>
                <span className={css(cE.ctaButtonOverlay)}></span>Submit for review
              </a>
            </div>
          : null }
          { this.state.showProgressBar ?
            <div className={css(styles.reviewButton)}>
              <ProgressBar progress={ this.state.uploadProgress } />
            </div>
          : null }
        </div>
      </div>
    )
  }

}

export default DragDropUploader
