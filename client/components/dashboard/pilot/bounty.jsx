// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import crd from './styles'

const BountyHelper = ({ bounty, distance }: Object ) => {
  return(
    <div className="flex pb-4 border-grey">
      <div className={css(crd.pilotInfoLeft)}>
        <div className={css(crd.pilotInnerBlock)}>
          <div className={css(crd.dollarWrapper)}>
            <div className={css(crd.dollarIcon)}><i className="fas fa-dollar-sign"></i></div>
            <div className={css(crd.numbers)}>
              { bounty }
            </div>
          </div>
          <div className={css(crd.footerLeft)}>min. bounty</div>
        </div>
      </div>
      <div className={css(crd.pilotInfoRight)}>
        <div className={css(crd.pilotInnerBlock)}>
          <div className={css(crd.carWrapper)}>
            <div className={css(crd.numbers)}>
              { distance }
            </div>
            <div className={css(crd.carIcon)}><i className="fas fa-car"></i></div>
          </div>
          <div className={css(crd.footerRight)}>est. distance (mi.)</div>
        </div>
      </div>
    </div>
  )
}

export default BountyHelper
