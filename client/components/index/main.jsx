import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Login from '../auth/login'
import Signup from '../auth/signup'
import Intro from './intro'
import About from './about'
import styles from '../../styles/cssUtils'

class IndexMain extends Component {
  render(){
    return(
      <div>
        <div className={css(styles.centerFlexContent)}>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </div>
        <Intro />
        <About />
      </div>
    )
  }
}

export default IndexMain
