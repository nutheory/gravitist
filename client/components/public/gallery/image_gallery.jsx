// @flow
import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

type Props = {
  images: Array<Object>,
  assetUrl: string
}

type State = {

}

class GalleryImages extends Component<Props, State> {

  constructor(props: Object){
    super(props)

    this.state ={

    }
  }

  render(){
    const photos = []
    this.props.images.map((ph, i) => photos.push({
      original: `${this.props.assetUrl}/photo_thumb/${ph.name}`,
      thumbnail: `${this.props.assetUrl}/photo_thumb/${ph.name}`
    }))
    return (
      <div>
        <ImageGallery items={photos} />
      </div>
    )
  }
}

export default GalleryImages
