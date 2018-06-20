// @flow
import React from "react"
import { Link } from 'react-router-dom'
import InitialImg from '../../../assets/images/agent_mac.png'
import CompletedImg from '../../../assets/images/agent_macbook.png'
import GalleryImg from '../../../assets/images/agent_gallery.png'

const FeaturesProcess = () => {
  return(
    <div className="container mx-auto py-8 px-6 md:px-0">
      <h1 className="text-center font-light text-grey-darker">Main Features</h1>
      <div className="py-8 md:py-12 flex flex-wrap -mx-8">
        <div className="px-8 w-full md:w-1/2">
          <div className="text-center"><img src={InitialImg} /></div>
        </div>
        <div className="px-8 py-8 md:py-12 w-full md:w-1/2">
          <div className="w-full md:w-4/5">
            <h1 className="text-2xl font-light text-blue-darker mb-3">Initial order dashboard</h1>
            <p className="text-lg">The order dashboard once you log in is the perfect place to write notes about
              the filming for the pilot and keep up to date on the status of the current filming.
              Your initial status is recruiting as we find a local drone pilot to your
              region to do the actual filming.  On the dashoard you can also enter information
              about the listing that will eventually be useful on the gallery site and in
              social media sharing.</p>
          </div>
        </div>
      </div>
      <div className="py-8 md:py-12 flex flex-wrap -mx-8 flex-col-reverse md:flex-row">
        <div className="p-8 w-full md:w-1/2">
          <div className="float-right w-full md:w-4/5 ">
            <h1 className="text-2xl font-light text-blue-darker mb-3">Completed order dashboard</h1>
            <p className="text-lg">After a short review by our quality assurance team to make sure the pilots
              uploaded video is up to our standards we brand and clean up your video to
              make it web friendly.  At this point we give you a very simple control panel
              that gives you everything you need in to share all media we created for you
              in both branded and unbranded forms. This is also where you can find and
              leads captured from your gallery site.</p>
          </div>
        </div>
        <div className="px-8 w-full md:w-1/2">
          <div className="text-center"><img src={CompletedImg} /></div>
        </div>
      </div>
      <div className="py-8 md:py-12 flex flex-wrap -mx-8">
        <div className="px-8 w-full md:w-1/2">
          <div className="text-center"><img src={GalleryImg} /></div>
        </div>
        <div className="px-8 w-full md:w-1/2">
          <div className="w-full md:w-4/5">
            <h1 className="text-2xl font-light text-blue-darker mb-3">Listing gallery</h1>
            <p className="text-lg pb-6">Once your order has been completed and delivered you will be given a link to
              your gallery which is made up of four areas that including your aerial filming
              video, your listing information, your contact information along with a contact
              form to capture visitors email or phone number, and lastly a image gallery with
              all your still photos. Your gallery site is open to the public and has all the
              proper Twitter and Facebook social media tags for sharing and posting.</p>
            <Link className=" action-button button-purple p-4" to={{pathname: '/demo', state: { modal: true} }}>
              <span className=" action-button-overlay"></span>
              View sample gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesProcess
