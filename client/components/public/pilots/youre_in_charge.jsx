// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const YoureInCharge = () => {
  return (
    <div className="bg-blue-darker py-8 md:py-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap text-white">
          <div className="relative w-full md:w-3/5">
            <div className="w-full md:w-3/5 pr-12 md:pr-2 pl-12 pb-8">
              <h2 className="pt-8">You're In Charge</h2>
              <h4 className="pt-8">Getting started is fast and easy</h4>
              <p className="pt-6">Sign up today and you’ll be flying in no time. Signing up takes only a couple of minutes.</p>
              <p className="pt-6">Don’t wait to start making great money with your drone!</p>
            </div>
            <div className="hidden md:block w-32 h-8 absolute pin-b pin-r"><img src={require('../../../assets/svg/drawn-arrow.svg')} alt="arrow" /></div>
          </div>
          <div className="w-full md:w-2/5 pl-8 pr-12">
            <div className="bg-white main-text text-center p-8">
              <h4 className="">Tell us a little about yourself and your drone</h4>
              <Link className=" action-button button-blue my-6" to="/pilots/register">
                <span className=" action-button-overlay"></span>
                Sign up now
              </Link>
              <p className="text-sm px-12">Just upload your FAA license number, and proof of insurance.</p>
              <p className="mt-4 text-sm px-12">Get approved as an independent contractor - You are good to go!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoureInCharge
