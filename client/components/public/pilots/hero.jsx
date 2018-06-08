// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ScrollDown from '../scroll_down'


const Hero = () => {
  return(
    <div className="hero">
      <div className="bg" style={{backgroundImage: `url(${require('../../../assets/images/pilotHero.jpg')})`}}>
        <div className="overlay"></div>
        <div className="w-full flex justify-end px-8 lg:pr-20">
          <div className="w-full sm:w-4/5 md:w-3/5 lg:w-3-5 xl:w-2/5 z-5">
            <div className="text-3xl xl:text-5xl text-white text-right t-shadow">Fly with Homefilming</div>
            <div className="text-xl xl:text-3xl text-white text-right t-shadow">Earn money. Fly when you want.</div>
            <div className="flex flex-wrap -mx-4 justify-end">
              <div className="p-4 inline-block">
                <Link className=" action-button button-green py-4 px-12" to="/pilots/register">
                  <span className=" action-button-overlay"></span>
                  Register now to start flying
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ScrollDown to="/" />
      </div>
    </div>
  )
}

export default Hero
