// @flow
import React from 'react'

const Photos = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-wrap p-8">
        <div className="w-full flex md:w-1/2">
          <div className="flex w-3/5 mx-auto">
            <div className="flex h-20 w-20 items-center justify-center">
              <img src={require('../../../assets/svg/make-money.svg')} alt="photo 1" className="w-full h-auto" />
            </div>
            <div className="inline-block pl-6">
              <h3 className="">Make great money</h3>
              <p className="mt-2">You can fly and earn as much as you want. The more you fly, the more you’ll make.</p>
            </div>
          </div>
        </div>
        <div className="w-full flex md:w-1/2">
          <div className="flex w-3/5 mx-auto">
            <div className="flex h-16 w-16 items-center justify-center">
              <img src={require('../../../assets/svg/calendar.svg')} alt="photo 1" className="w-full h-auto" />
            </div>
            <div className="inline-block pl-6">
              <h3 className="">Fly when you want</h3>
              <p className="mt-2"> Only fly when it works for you. Its your business.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full flex h-100">
        <div className="w-full flex md:w-1/2"><img src={require('../../../assets/images/drone1@2x.jpg')} alt="photo 1" className="w-full h-auto" /></div>
        <div className="hidden md:flex md:w-1/2"><img src={require('../../../assets/images/drone2@2x.jpg')} alt="photo 2" className="w-full h-auto" /></div>
      </div>
    </div>
  )
}

export default Photos
