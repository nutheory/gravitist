import React, { Component } from 'react'
import _ from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/auth'


class Pricing extends Component {

  tombstoneRender(tombObj){
    return(
      <div id={tombObj.plan_name} className={css(styles.tomb)}>
        <h3>{tombObj.plan_title}</h3>
        <h2>{tombObj.plan_price}</h2>
        <ul className={css(styles.featurelist)}>
          {_.each(tombObj.features, (feat) => {
            <li>
              <strong>{feat[0]}</strong>
              <p>{feat[1]}</p>
            </li>
          })}
        </ul>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.tombstoneRender({
          'plan_price': '$199 Per Listing',
          'plan_name': 'basicPlan',
          'plan_title': 'Basic Plan',
          'features': [
            [['Videos'], ['6 10 second video clips']],
            [['Photos'], ['16 High quaility images']],
            [['Delivery'], ['4 days']]]
        })}
        {this.tombstoneRender({
          'plan_price': '$299 Per Listing',
          'plan_name': 'premPlan',
          'plan_title': 'Premium Plan',
          'features': [
            [['Videos'], ['6 10 second video clips, 30 second continuous shot']],
            [['Video Extras'], ['Professional Editing, Music, and Branding']],
            [['Photos'], ['16 High quaility images']],
            [['Delivery'], ['6-7 days']]]
        })}
        {this.tombstoneRender({
          'plan_price': '$499 Per Listing',
          'plan_name': 'goldPlan',
          'plan_title': 'Gold Plan',
          'features': [
            [['Custom Url to share for social media'], ['A landing contact page for the property']],
            [['Videos'], ['6 10 second video clips, 30 second continuous shot']],
            [['Video Extras'], ['Professional Editing, Music, and Branding']],
            [['Photos'], ['16 High quaility images']],
            [['Delivery'], ['6-7 days']]]
        })}
      </div>
    )
  }
}

export default Pricing
