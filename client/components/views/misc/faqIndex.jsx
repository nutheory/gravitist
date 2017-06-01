import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'
import _ from 'lodash'
import Faq from './faq'
import faq from './styles/faq'
import cL from '../../../styles/commonLayout'
import cT from '../../../styles/commonText'
import faqs from '../../../utils/faqs.json'

const FaqIndex = () => {
  return(
    <div className={css(cL.centerMainContent)}>
      <div className={css(faq.container)}>
        <h2 className={css(cT.sectionHeader)}>Frequently asked questions</h2>
        {faqs.map((f, i) => <Faq faq={f} key={`faq_${i}`} index={i} /> )}
      </div>
    </div>
  )
}

export default FaqIndex
