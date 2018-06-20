// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const instructions = [
  {img: require('../../../assets/svg/account.svg'), text: "Order a filming" },
  {img: require('../../../assets/svg/drone.svg'), text: "Our pilot flys your listing" },
  {img: require('../../../assets/svg/post.svg'),  text: "We edit the photos and video" },
  {img: require('../../../assets/svg/sells.svg'), text: "Your listing sells and you get paid" }
]

const createSteps = (instruct, i) => {
  return (
    <div key={`instruct_${i}`} className="flex relative w-full md:w-1/4 p-4 md:pb-8">
      <div className="absolute pin-t pin-r flex rounded-full w-10 h-10 text-white font-bold items-center justify-center bg-blue-dark">{i+1}</div>
      <div className="shadow w-full rounded bg-white py-8">
        <img src={ instruct.img } className="block h-16 w-16 mx-auto" />
        <p className="text-center font-bold mx-6 mt-4">{ i === 0 ? <Link to="/pricing">{instruct.text}</Link> : instruct.text }</p>
      </div>
    </div>
  )
}

const HowItWorks = () => {
  return (
    <div className="container mx-auto py-8 md:py-20">
      <h1 className="pb-8 md:pb-12 text-center">How it works</h1>
      <div className="flex flex-wrap mx-4 lg:-mx-4">
        { instructions.map((instruct, i) => createSteps(instruct, i)) }
      </div>
      <div className="text-center mt-8">
        <Link className=" action-button button-green py-4 w-1/2 md:w-64" to="/pricing">
          <span className=" action-button-overlay"></span>
          Order now!
        </Link>
      </div>
    </div>
  )
}

export default HowItWorks
