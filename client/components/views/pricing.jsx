import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/pricing'
import layout from '../../styles/layout'



class Pricing extends Component {


  printList() {
    return(
      <li className={css(layout.listItemLI)}>
        <div><strong>{feat[0]}</strong></div>
        <p>{feat[1]}</p>
      </li>
    )
  }

  tombstoneRender(tombObj){
    return(
      <div id={tombObj.plan_name} className={css(styles.tomb)}>
        <h3 className={css(styles.planTitle)}>{tombObj.plan_title}</h3>
        <h2 className={css(styles.planPrice)}>{tombObj.plan_price}</h2>
        <ul className={css(layout.listItemUL)}>
          {tombObj.features.map((feat, i) => {
            return (
              <li key={i} className={css(layout.listItemLI)}>
                <div><strong>{feat[0]}</strong></div>
                <p>{feat[1]}</p>
              </li>
            )
          })}
        </ul>
        <NavLink className={css(styles.planCallToAction)} to={`/signup/user/${tombObj.plan_name}`}>Choose {tombObj.plan_title}</NavLink>
      </div>
    )
  }

  render(){
    return(
      <div className={css(styles.container)}>
        {this.tombstoneRender({
          'plan_price': '$199',
          'plan_name': 'basic',
          'plan_title': 'Basic',
          'features': [
            ['Videos', '6 10 second video clips'],
            ['Photos', '16 High quaility images'],
            ['Delivery', '4 days']
          ]
        })}
        {this.tombstoneRender({
          'plan_price': '$299',
          'plan_name': 'premium',
          'plan_title': 'Premium',
          'features': [
            ['Videos', '6 10 second video clips, 30 second continuous shot'],
            ['Video Extras', 'Professional Editing, Music, and Branding'],
            ['Photos', '16 High quaility images'],
            ['Delivery', '6-7 days']
          ]
        })}
        {this.tombstoneRender({
          'plan_price': '$499',
          'plan_name': 'gold',
          'plan_title': 'Gold',
          'features': [
            ['Custom Url to share for social media', 'A landing contact page for the property'],
            ['Videos', '6 10 second video clips, 30 second continuous shot'],
            ['Video Extras', 'Professional Editing, Music, and Branding'],
            ['Photos', '16 High quaility images'],
            ['Delivery', '6-7 days']
          ]
        })}
      </div>
    )
  }
}

export default Pricing
