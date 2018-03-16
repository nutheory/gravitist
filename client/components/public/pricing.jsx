// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return(
    <div className="hero h-screen">
      <div className="bg" style={{ height: '100vh', backgroundImage: `url(${require('../../assets/images/homePhoto1.jpg')})` }}>
        <div className="overlay"></div>
        <div className="w-full flex justify-end px-8 lg:pr-20">
          <div className="w-full sm:w-4/5 md:w-3/5 lg:w-3-5 xl:w-2/5 z-5">
            <div className="text-3xl xl:text-5xl text-white t-shadow mt-4">What you get...</div>
            <div className="text-xl xl:text-3xl text-white t-shadow mt-4">
              <div className="inline-block"><i className="far fa-check-circle fa-lg text-green pr-4 pt-1"></i></div>
              <div className="inline-block">2 minute video fly around of the property.</div>
            </div>
            <div className="text-xl xl:text-3xl text-white t-shadow mt-4">
              <div className="inline-block"><i className="far fa-check-circle fa-lg text-green pr-4 pt-1"></i></div>
              <div className="inline-block">20 Hi-res photos.</div>
            </div>
            <div className="text-xl xl:text-3xl text-white t-shadow mt-4 flex">
              <div className="inline-block"><i className="far fa-check-circle fa-lg text-green pr-4 pt-1"></i></div>
              <div className="inline-block flex-1">Online Gallery of the above photos and videos that includes listing info.</div>
            </div>
            <div className="text-xl xl:text-3xl text-white t-shadow mt-4 flex">
              <div className="inline-block"><i className="far fa-check-circle fa-lg text-green pr-4 pt-1"></i></div>
              <div className="inline-block flex-1">Ability to collect lead information from gallery visitors.</div>
            </div>

            <div className="flex flex-wrap -mx-4 justify-end mt-8">
              <div className="p-4 w-full md:w-1/2">
                <div className="text-3xl xl:text-5xl text-white text-right t-shadow">
                  <span className="text-2xl">Our price</span> $199
                </div>
              </div>
              <div className="p-4 w-full md:w-1/2">
                <Link className="button-green p-4 text-xl" to="/pricing/order/standard">
                  <span className="action-button-overlay"></span>
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
