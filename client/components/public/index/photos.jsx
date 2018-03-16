// @flow
import React from 'react'

const Photos = () => {

  return (
    <div className="bg-white">
      <div className="container mx-auto w-full flex h-100">
        <div className="w-full flex md:w-1/2 lg:w-1/3"><img src={require('../../../assets/images/home1@2x.jpg')} alt="photo 1" className="w-full h-auto" /></div>
        <div className="hidden md:flex md:w-1/2 lg:w-1/3"><img src={require('../../../assets/images/home2@2x.jpg')} alt="photo 2" className="w-full h-auto" /></div>
        <div className="hidden lg:flex lg:w-1/3"><img src={require('../../../assets/images/home3@2x.jpg')} alt="photo 3" className="w-full h-auto" /></div>
      </div>
    </div>
  )
}

export default Photos
