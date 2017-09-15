import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from 'aphrodite'
import styles from '../../styles/common_layout'
import PricingList from './pricing_list'
import MainOrder from './main_order'

const Pricing = (props) => {
  return (
    <div className={css(styles.centerMainContent)}>
      <Router>
        <div>
          <Route exact path="/pricing" render={({match}) => (
            <div>
              <PricingList header={{ title: "Get Started by Choosing a Plan!" }} />
            </div>
          )} />
          <Route path="/pricing/order/:plan" component={MainOrder} />
        </div>
      </Router>
    </div>
  )
}

export default Pricing
