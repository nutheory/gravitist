// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const HardSell = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-8 md:py-20">
        <div className="flex mx-4 md:-mx-4">
          <div className="hidden md:block w-3/5">
            <img src={require('../../../assets/images/whiteDrone@2x.png')} className="px-12" alt="drone image" />
          </div>
          <div className="w-full w-2/5 px-12">
            <p className="text-xl font-bold my-6">Be honest with yourself: does your real estate
              photography do your listings any justice?</p>

            <p className="text-xl font-bold my-6">Or is it just more of the same old front yard,
              back yard, kitchen and bathroom… like every other
              realtor on the block?</p>

            <p className="text-xl my-6">In a competitive industry, you need to stand out
              from your competition—and that’s where our aerial
              drone photography and videography service comes to
              knock your listings out of the park—skywards!</p>

            <p className="text-xl my-6">Not only will you show off your property in a
              unique way that no-one else is, drone videos also
              increase the quality of serious buyers for better
              showings and higher offers.</p>

            <div className="mt-12 text-center">

              <Link to="/pilots/register" className="button-green p-4 w-full md:w-1/2">
                <span className="action-button-overlay"></span>Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HardSell
