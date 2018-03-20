// @flow
import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'
import _ from 'lodash'
import Faq from './faq'
import Header from './header'
import faq from './styles/faq'
import faqs from '../../utils/faqs.json'

const faqList = JSON.parse(JSON.stringify(faqs))

const FaqIndex = () => {
  return(
    <div className="relative flex flex-col w-full">
      <div className={css(faq.container)}>
        <Header title="Frequently asked questions" />
        <div style={{margin: '40px'}}>
          {faqList.map((f, i) => <div key={`faq_${i}`}><Faq faq={f} index={i} /></div> )}
        </div>
      </div>
    </div>
  )
}

export default FaqIndex
