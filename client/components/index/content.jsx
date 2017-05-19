import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import OrderWalkthrough from '../views/orderWalkthrough'
import styles from '../../styles/cssUtils'

class Content extends Component {
  render(){
    return(
      <div>
        <div className={css(styles.centerFlexContent)}>
          {/* <Route path='/signup/:type?/:plan?/:idx?' render={props => ( */}
            <div>
              <OrderWalkthrough  />
            </div>
          {/* )} /> */}
        </div>
      </div>
    )
  }
}

export default Content
