import React, { Component } from 'react'
import Dropzone from 'react-dropzone'


class Uploader extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(accepted, rejected) {
    this.setState({
      accepted,
      rejected
    })
  }

  render(){
    return(
      <div className="dropzone">
        <Dropzone
          accept={this.props.acceptedTypes || "image/jpeg, image/png, image/gif"}
          name={this.props.name}
          multiple={this.props.multiple || true}
          maxSize={this.props.maxsize}
          onDrop={this.onDrop}
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return "This file is authorized";
            }
            if (isDragReject) {
              return "This file is not authorized";
            }
            return acceptedFiles.length || rejectedFiles.length
              ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
              : "Try dropping some files.";
          }}
        </Dropzone>

      </div>
    )
  }
}

export default Uploader
