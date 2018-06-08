// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ScrollDown from '../scroll_down'

const Hero = (props: Object) => {
  return(
    <div className="hero">
      <div className="bg" style={{background: `url(/${require('../../../assets/images/homeHero.jpg')}) no-repeat`}}>
        <div className="overlay"></div>
        <div className="w-full flex justify-end px-8 lg:pr-20">
          <div className="w-full sm:w-4/5 md:w-3/5 lg:w-3-5 xl:w-2/5 z-5">
            <div className="text-3xl xl:text-5xl text-white text-right t-shadow">We make aerial videos for residential real estate agents</div>
            <div className="flex flex-wrap -mx-4 justify-end">
              <div className="p-4 w-full md:w-1/2">
                <Link className=" action-button button-green p-4" to="/pricing">
                  <span className=" action-button-overlay"></span>
                  View Pricing
                </Link>
              </div>
              <div className="p-4 w-full md:w-1/2">
                <Link className=" action-button button-purple p-4" to={{pathname: '/sample-video', state: { modal: true} }}>
                  <span className=" action-button-overlay"></span>
                  View Sample Video
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ScrollDown to="/" jumpStart={props.jumpStart} />
      </div>
    </div>
  )
}

export default Hero
