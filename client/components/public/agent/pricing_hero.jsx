// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
  return(
    <div className="hero h-screen">
      <div className="bg" style={{ height: '100vh', backgroundImage: `url(${require('../../../assets/images/homePhoto1.jpg')})` }}>
        <div className="overlay"></div>
        <h1 className="text-center my-8 text-white z-5">Get started by choosing a plan</h1>
      </div>
    </div>
  )
}

export default Hero
