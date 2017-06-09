import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'
import _ from 'lodash'
import Faq from './faq'
import Header from './header'
import faq from './styles/faq'
import cL from '../../../styles/commonLayout'
import cT from '../../../styles/commonText'
import faqs from '../../../utils/faqs.json'

const faqList = JSON.parse(JSON.stringify(faqs))

const FaqIndex = () => {
  return(
    <div className={css(cL.centerMainContent)}>
      <div className={css(faq.container)}>
        <Header title="Frequently asked questions" />
        <div style={{margin: '40px'}}>
          {faqList.map((f, i) => <Faq faq={f} key={`faq_${i}`} index={i} /> )}
        </div>
      </div>
    </div>
  )
}

export default FaqIndex
