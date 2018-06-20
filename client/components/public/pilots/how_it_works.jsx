// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import MissionsImg from '../../../assets/images/missions.png'
import UploadImg from '../../../assets/images/pilot_macbook.png'

const HowItWorks = () => {

  return (
    <div className="container mx-auto py-8 px-6 md:px-0">
      <h1 className="pb-8 md:pb-12 text-center font-light text-grey-darker">How it Works</h1>
      <div className="flex flex-wrap -mx-4 pb-12 md:pb-20">
        <div className="w-full md:w-1/3">
          <div className="p-4">
            <div className="p-4 pt-12 rounded-lg shadow relative h-full md:h-64">
              <div className="absolute pin-t pin-l p-2 rounded-tl-lg rounded-br bg-blue-darker text-white">Step 1</div>
              <div className="flex flex-col h-full">
                <h1 className="text-2xl font-light text-blue-darker mb-3">Register to get started</h1>
                <p className="flex-1">Register now with our 2 step signup process. Step 1 will get you setup to start
                  accepting missions. Step 2 is to setup a debit card that we can transer money to, to pay you.</p>
                <Link className="action-button button-green py-4 mt-4 w-full" to="/pilots/register">
                  <span className="action-button-overlay"></span>
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="p-4">
            <div className="p-4 pt-12 rounded-lg shadow relative h-full md:h-64">
              <div className="absolute pin-t pin-l p-2 rounded-tl-lg rounded-br bg-blue-darker text-white">Step 2</div>
              <div className="flex flex-wrap -mx-4 mb-3">
                <div className="px-4 w-full md:w-2/5">
                  <div className="text-center"><img src={MissionsImg} /></div>
                </div>
                <div className="px-4 w-full md:w-3/5">
                  <h1 className="text-2xl font-light text-blue-darker mb-3">Choose a local mission</h1>
                  <p className="">Once your FAA license and insurance have been verified you can start browsing local
                    missions. You can accept multiple missions at once but you must complete any mission you do accept.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="p-4">
            <div className="p-4 pt-12 rounded-lg shadow relative h-full md:h-64">
              <div className="absolute pin-t pin-l p-2 rounded-tl-lg rounded-br bg-blue-darker text-white">Step 3</div>
              <div className="flex flex-wrap -mx-4 mb-3">
                <div className="px-4 w-full md:w-2/5">
                  <div className="text-center"><img src={UploadImg} /></div>
                </div>
                <div className="px-4 w-full md:w-3/5">
                  <h1 className="text-2xl font-light text-blue-darker mb-3">Film and upload</h1>
                  <p className="">Visit the location, get 4-5 minutes of usable footage.
                    Once you finish filming simply use our uploader to submit your work for review. Thats it, your job is done.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="p-4">
            <div className="p-4 pt-12 rounded-lg shadow relative h-full md:h-64">
              <div className="absolute pin-t pin-l p-2 rounded-tl-lg rounded-br bg-blue-darker text-white">Step 4</div>
              <div className="flex flex-col h-full">
                <h1 className="text-2xl font-light text-blue-darker mb-3">We pay you</h1>
                <p className="flex-1">We make sure to send all payments the same business day we receive and approve the upload.
                All tranfers go straight to whatever account you signed up with.</p>
                <Link className="action-button button-green py-4 mt-4 w-full" to="/pilots/register">
                  <span className="action-button-overlay"></span>
                  Get paid
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
