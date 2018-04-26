import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const GalleryFooter = (props) => {
  return (
    <div className="bg-grey-darker fixed pin-b border-t border-grey-darkest w-full py-1 z-20">
      <div className="container mx-auto">
        <div className="pl-4 font-bold">
          <Link to="/" className="text-white"><span className="text-xs no-underline">powered by </span>Homefilming</Link>
        </div>
      </div>
    </div>
  )
}

export default GalleryFooter
