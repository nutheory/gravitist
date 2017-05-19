import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Login from '../forms/login'
import Signup from '../forms/orderSignup'
import Intro from './intro'
import Content from './content'
import styles from '../../styles/cssUtils'

class IndexMain extends Component {
  render(){
    return(
      <div>
        <Content />
        {/* <Intro />
        <About />
        <div className={css(styles.centerFlexContent)}>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup/:plan' render={props => (
            <div>
              <Signup {...props} key={props.match.params.plan} />
            </div>
          )} />
        </div> */}
      </div>
    )
  }
}

export default IndexMain
