// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import ScrollDown from '../scroll_down'

const Hero = () => {
  return (
    <div className="hero">
      <div className="bg" style={{backgroundImage: `url(/${require('../../../assets/images/homePhoto2.jpg')})`}}>
        <div className="overlay"></div>
        <div className="w-full flex justify-end px-8 lg:pr-20">
          <div className="w-full sm:w-4/5 md:w-3/5 lg:w-3-5 xl:w-2/5 z-5">
            <div className="text-3xl xl:text-5xl text-white text-right t-shadow">Fly above your competition and skyrocket home sales</div>
            <div className="text-xl xl:text-3xl text-white text-right t-shadow">
              Show buyers unique drone photos and videos of your real estate listings for a
              fresh new perspective that increases sales.
            </div>
            <div className="flex flex-wrap -mx-4 justify-end">
              <div className="p-4 w-full md:w-1/2">
                <Link className="button-green p-4" to="/pricing">
                  <span className="action-button-overlay"></span>
                  View Pricing
                </Link>
              </div>
              <div className="p-4 w-full md:w-1/2">
                <Link className="button-purple p-4" to={{pathname: '/sample-video', state: { modal: true} }}>
                  <span className="action-button-overlay"></span>
                  View Sample Video
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
