// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import { render } from 'react-dom'
import styles from './styles/pricing'
import summary from './styles/summary'

type Props = {
  mapLatLng?: Array<string>,
  selectedPlan: Object
}

class PlanSummary extends Component<Props> {

  fetchAssociatedMap: Function

  constructor(){
    super()

    this.fetchAssociatedMap = this.fetchAssociatedMap.bind(this)
  }

  async fetchAssociatedMap(){
    if(this.props.mapLatLng){
      const mapOptions = {
        center: {
          lat: this.props.mapLatLng[0],
          lng: this.props.mapLatLng[1]
        },
        zoom: 20,
        mapTypeId: 'satellite',
        scrollwheel: false
      }
      const map = await new google.maps.Map(document.getElementById('mapArea'), mapOptions)
    }
  }

  render(){
    this.fetchAssociatedMap()
    return (
      <div className={css(summary.container)}>
        <div className={css(summary.mainInfo)}>
          <h1 className={css(summary.planTitle)}>{this.props.selectedPlan.title}</h1>
          <h3 className={css(summary.planDesc)}>{this.props.selectedPlan.desc}</h3>
        </div>
        <div className={css(summary.featuresList)}>
          <ul className={css(styles.features)}>
            {this.props.selectedPlan.features.map((feat, i) => {
              return (
                <li key={i} className={css(styles.feature)}>
                  <i className={`${css(styles.icon)} fa fa-${feat.icon} fa-2x`} />
                  <p className={css(styles.featureDesc)}>{feat.desc}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={css(summary.previewArea)} id='mapArea'></div>
        <div className={css(summary.footer)}>
          <p className={css(summary.priceText)}>by clicking "Submit" we will charge the amount below
            <span className={css(summary.change)}>
              <Link to="/pricing" className={css(styles.changeLink)}>Change Plan</Link>
            </span>
          </p>
          <div className={css(summary.priceArea)}>
            <span className={css(summary.dollarSign)}>$</span>
            <span className={css(summary.price)}>{this.props.selectedPlan.price}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default PlanSummary
