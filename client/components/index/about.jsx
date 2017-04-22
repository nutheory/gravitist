import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/about'
<<<<<<< HEAD
=======
import Pricing from '../auth/pricing'
>>>>>>> new

class IndexAbout extends Component {
  render(){
    return (
      <div className={css(styles.aboutContainer)}>
        <div className={css(styles.leadIn)}>
          <h2>Birds-eye view</h2>
          <p>Aerial Photos and Videos show off the front yard, back yard and surrounding neighborhood in ways that old fashioned photography can’t.
          Get quality buyers, better showings, fewer looky loos, and higher offers.</p>
<<<<<<< HEAD

          <p>Post your videos and take full advantage of social media</p>
          <p>Zillow Trulia Facebook SnapChat Instagram Twitter</p>
           $250
        </div>
=======
          <p>Post your videos and take full advantage of social media</p>
          <p>Zillow Trulia Facebook SnapChat Instagram Twitter</p>
        </div>
        <Pricing />
>>>>>>> new

      </div>
    )
  }
}

export default IndexAbout
