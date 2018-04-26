// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PricingHero from './pricing_hero'
import PricingOptions from './pricing_options'


type Props = {

}

const Pricing = (props: Props) => {
  return (
    <div>
      <Route exact path="/pricing" render={({match}) => (
        <div>
          <PricingHero />
          <PricingOptions pageType="public" />
        </div>
      )} />
    </div>
  )
}

export default Pricing
