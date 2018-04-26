// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Plans from '../../../utils/pricing_plans.json'

const PricingOptions = (props: Object) => {
  return(
    <div className="container mx-auto z-10 my-16">
      <div className="-mx-4 flex flex-wrap">
        { Plans.map(plan => (
          <div key={`plan_${plan.planId}`} className={`px-4 py-${ plan.planId === 2 ? '0' : '12' } w-full  md:w-1/3 mx-4 md:mx-0 flex`}>
            <div className="flex flex-col bg-white shadow rounded p-6 w-full">
              <h2 className="text-xl xl:text-2xl">{ plan.title }</h2>
              <div className="text-xl xl:text-2xl mt-4 flex flex-wrap">
                <div className="w-1/2">Price</div>
                <div className="w-1/2 text-right">${ plan.price }</div>
              </div>
              <div className="text-xl xl:text-2xl mt-4">What you get...</div>
              <div className="text-lg xl:text-xl mt-4">
                { plan.features.map((feat, i) => (
                  <div key={`plan_${plan.planId}_feature_${i}`} className="flex mb-4">
                    <div className=""><i className="far fa-check-circle fa-2x text-green pr-4 -mt-1"></i></div>
                    <div className="flex-1">{ feat.desc }</div>
                  </div>
                ))}
              </div>
              <div className="w-full flex items-end mt-6 h-full">
                <Link
                  className="button-green p-4 text-xl"
                  to={`${props.pageType === "public" ? '/pricing/order/' : '/re-order/' }${plan.name}`}>
                  <span className="action-button-overlay"></span>
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingOptions
