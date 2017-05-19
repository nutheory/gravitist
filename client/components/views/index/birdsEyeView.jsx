import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import bev from './styles/birdsEyeView'
import general from './styles/general'
import drone from '../../../assets/images/drone@2x.png'
import clouds from '../../../assets/images/cloudsBg.png'
import trulia from '../../../assets/images/trulia@2x.png'
import zillow from '../../../assets/images/zillow@2x.png'
import realtor from '../../../assets/images/realtor@2x.png'
import youtube from '../../../assets/images/youtube@2x.png'

const BirdsEyeView = () => {

  return (
    <div className={css(bev.container)} style={{background: `url(/${clouds}) no-repeat`}}>
      <div className={css(bev.drone)} style={{background: `url(/${drone}) no-repeat`}}></div>
      <div className={css(bev.info)}>
        <div className={css(bev.infoWrapper)}>
          <h1 className={css(bev.sectionHeader)}>Birds Eye View</h1>
          <p className={css(bev.infoText)}>Aerial imagery shows off the home and neighborhood in ways that old fashioned street level photography can’t.</p>
          <div className={css(bev.worksWith)}>
            <h3 className={css(bev.worksWithHeader)}>Works with</h3>
            <div className={css(bev.worksWithLogos)}>
              <div className={css(bev.logo)} style={{ background: `url(/${zillow}) no-repeat`, width: '116px', height: '26px', backgroundSize: '116px 26px' }}></div>
              <div className={css(bev.logo)} style={{ background: `url(/${trulia}) no-repeat`, width: '82px', height: '28px', backgroundSize: '82px 28px' }}></div>
              <div className={css(bev.logo)} style={{ background: `url(/${realtor}) no-repeat`, width: '142px', height: '30px', backgroundSize: '142px 30px'}}></div>
              <div className={css(bev.logo)} style={{ background: `url(/${youtube}) no-repeat`, width: '94px', height: '38px', backgroundSize: '94px 38px'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirdsEyeView
