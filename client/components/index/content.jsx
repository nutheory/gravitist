import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Login from '../forms/login'
import Signup from '../forms/signup'
import Pricing from '../views/pricing'
import styles from '../../styles/cssUtils'

class Content extends Component {
  render(){
    return(
      <div>
        <div className={css(styles.centerFlexContent)}>
          <Pricing />
        </div>
        <Route exact path='/login' component={Login} />
        <Route path='/signup/:type/:plan?' render={props => (
          <div>
            <Signup {...props} key={props.match.params.plan} />
          </div>
        )} />
      </div>
    )
  }
}

export default Content
