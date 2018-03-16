// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PricingHero from '../../public/pricing'


type Props = {

}

const Pricing = (props: Props) => {
  return (
    <div>
      <Route exact path="/pricing" render={({match}) => (
        <PricingHero />
      )} />
    </div>
  )
}

export default Pricing
