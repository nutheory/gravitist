// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { css } from 'aphrodite'
import styles from './styles/drag_drop_uploader'
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Tus from 'uppy/lib/plugins/Tus'
import DragDrop from 'drag-drop'
import mimeTypes from '../../utils/mime_types.js'

type Props = {
  header: string,
  fileTypeName: string,
  multiple?: boolean,
  source: string,
  fieldname: string,
  endpoint: string,
  auth?: Object,
  auto?: boolean,
  mimes: 'images' | 'videos' | 'documents',
  returnUppyInstance: Function
}

class DragDropUploader extends Component<Props> {

  addFileObjsToUppy: Function
  handleDrop: Function
  onBrowseClick: Function
  onInputChange: Function
  checkDragDropSupport: Function
  uppy: Object
  dropzone: ?HTMLDivElement
  inputElement: ?HTMLInputElement
  uploadPreview: ?HTMLDivElement

  constructor(){
    super()

    this.uppy = {}
    this.addFileObjsToUppy = this.addFileObjsToUppy.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.onBrowseClick = this.onBrowseClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.checkDragDropSupport = this.checkDragDropSupport.bind(this)
  }

  componentDidMount(){
    this.handleDrop()
    this.uppy = Uppy({
      id: this.props.source,
      meta: { id: 'avatarUploader', type: 'avatar' },
      restrictions: { allowedFileTypes: mimeTypes[this.props.mimes] },
      autoProceed: this.props.auto || false,
    })
    this.uppy.use(XHRUpload, {
      endpoint: this.props.endpoint,
      fieldName: this.props.fieldname,
      headers: {
        'authorization': localStorage.getItem('hf_auth_header_token')
      }
    })
    // this.uppy.use(Tus, {
    //   endpoint: this.props.endpoint,
    //   fieldName: this.props.fieldname,
    //   headers: {
    //     'authorization': this.props.auth || localStorage.getItem('hf_auth_header_token')
    //   }
    // })

    this.uppy.run()
  }

  checkDragDropSupport () {
    const div = document.createElement('div')
    if (!('draggable' in div) || !('ondragstart' in div && 'ondrop' in div)) { return false }
    if (!('FormData' in window)) { return false }
    if (!('FileReader' in window)) { return false }
    return true
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
    this.props.returnUppyInstance(this.uppy)
  }

  generatePreview(file: Object){
    const reader = new FileReader()
    const previewEl = this.uploadPreview
    reader.onload = function (e) {
      if(previewEl){ previewEl.setAttribute("style", `background: url(${e.target.result}); opacity: 1 !important`) }
    }
    reader.readAsDataURL(file)
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

  render(){
    return (
      <div className={css(styles.mainDragDropWrapper)} >
        <div
          ref={ dropzone => this.dropzone = dropzone }
          className={css(styles.mainDragDropContainer)}
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
            <div className={css(styles.mainDragDropInstruction)}>
              <i className={`${css(styles.mainDragDropIcon)} fa fa-cloud-upload fa-2x`}></i>
              <h3 className={css(styles.mainDragDropHeader)}>{this.props.header}</h3>
              <p className={css(styles.mainDragDropText)}>Drag & drop {this.props.fileTypeName} or click to browse</p>
            </div>
            <div className={css(styles.mainDragDropPreview)} ref={ preview => this.uploadPreview = preview }>
              <div className={css(styles.changeDragDropOverlay)}>Change {this.props.fileTypeName}</div>
            </div>
            <label className={css(styles.clickableDragDropLabel)} onClick={this.onBrowseClick}></label>
          </form>
        </div>
      </div>
    )
  }

}

export default DragDropUploader
