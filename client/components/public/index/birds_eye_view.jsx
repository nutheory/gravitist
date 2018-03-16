// @flow
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ipadImg from '../../../assets/images/ipad.png'

const BirdsEyeView = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-8 flex flex-wrap">
        <div className="w-full md:w-1/2">
          <div className="p-8">
            <img src={ ipadImg } />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="p-8">
            <h1 className="mb-4">Birds Eye View</h1>
            <p className="text-2xl leading-wide font-thin">Aerial imagery shows off the home and neighborhood in
              ways that old fashioned street level photography can’t.</p>
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
    </div>
    // <div className={css(bev.container)}>
    //   <div className={css(bev.infoWrapper)}>
    //     <div className={css(bev.synopsis)}>Birds Eye View</div>
    //     <p className={css(bev.infoText)}>Aerial imagery shows off the home and neighborhood in ways that old fashioned street level photography can’t.</p>
    //     <div className={css(bev.ctaButtons)}>
    //       <div className={css(bev.ctaButtonLeft)}>
    //         <NavLink className={css(cE.ctaButton, cE.ctaGreen)} to="/pricing">
    //           <span className={css(cE.ctaButtonOverlay)}></span>
    //           Get Started
    //         </NavLink>
    //       </div>
    //       <div className={css(bev.ctaButtonRight)}>
    //         <Link className={css(cE.ctaButton, cE.ctaPurple)} to="/how-it-works">
    //           <span className={css(cE.ctaButtonOverlay)}></span>
    //           How it Works
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default BirdsEyeView
