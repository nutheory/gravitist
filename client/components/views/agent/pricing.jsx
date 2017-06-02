import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from 'aphrodite'
import styles from '../../../styles/commonLayout'
import PricingList from './pricingList'
import Order from './order'

class Pricing extends Component {

  render(){
    console.log("css", css(styles.centerMainContent))
    return(
      <div className={css(styles.centerMainContent)}>
        <Router>
          <div>
            <Route exact path="/pricing" render={({match}) => (
              <div>
                <PricingList header={{ title: "Get Started by Choosing a Plan!" }} />
              </div>
            )} />
            <Route exact path="/pricing/order/:plan" component={Order} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Pricing
