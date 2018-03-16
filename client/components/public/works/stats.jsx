// @flow
import React, { Component } from 'react'

const charts = [
  { img: require('../../../assets/svg/68.svg'), cl: "border-grey-light border-r border-b", text: "According to MLS, homes with aerial images sold 68 percent faster than homes with standard images" },
  { img: require('../../../assets/svg/85.svg'), cl: "border-grey-light border-b", text: "85 percent of buyers and sellers want to work with an agent who uses video, however, only 9 percent of agents create listing videos" },
  { img: require('../../../assets/svg/4.svg'), cl: "border-grey-light border-r", text: "Homes listed with video get four times the inquiries of homes listed without video" },
  { img: require('../../../assets/svg/75.svg'), cl: "", text: "Including video in emails doubles the click-through rate and reduces opt-outs by 75 percent" }
]

const createChart = (stat, i) => {
  return (
    <div key={`stat_${i}`} className={`w-full md:w-1/2 px-12 ${ stat.cl }`}>
      <div className="px-12 py-8">
        <div className="text-xl text-center"><img src={ stat.img } className="w-64 h-48" /></div>
        <div className="mt-6 text-xl text-center">{ stat.text }</div>
      </div>
    </div>
  )
}

const Stats = () => {
  return (
      <div className="bg-white">
        <div className="container mx-auto py-8 md:py-20">
          <h1 className="pb-8 md:pb-12 text-center">Quick stats</h1>
          <div className="flex flex-wrap mx-4 lg:-mx-4">
            {charts.map((stat, i) => createChart(stat, i) )}
          </div>
        </div>
      </div>
  )
}

export default Stats
