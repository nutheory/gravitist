// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from 'aphrodite'
import cL from '../../styles/common_layout'
import PricingList from './pricing_list'
import Order from './order'

type Props = {

}

const Pricing = (props: Props) => {
  return (
    <div>
      <div className={css(cL.pricingContainer)}>
        <div className={css(cL.heroBg, cL.heroBgFull)} style={{background: `url(${require('../../assets/images/pricingBg2.jpg')}) no-repeat`}}>
          <div className={css(cL.pricingOverlay)}></div>
          <div className={css(cL.centerMainContent)}>
            <Route exact path="/pricing" render={({match}) => (
              <PricingList />
            )} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
