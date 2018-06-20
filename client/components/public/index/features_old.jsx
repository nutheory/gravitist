// @flow
import React from 'react'


const Features = () => {

  const features = [
    { img: require('../../../assets/svg/videos.svg'), text: "High resolution photos and videos" },
    { img: require('../../../assets/svg/post.svg'), text: "Post production and editing" },
    { img: require('../../../assets/svg/pro.svg'), text: "Prompt and professional service" },
    { img: require('../../../assets/svg/drone.svg'), text: "FAA licensed pilot" },
    { img: require('../../../assets/svg/insured.svg'), text: "Fully insured" },
    { img: require('../../../assets/svg/48.svg'), text: "72-hour turnaround" },
  ]

  const feature = (ft, i) => {
    return (
      <div key={`feature_${i}`} className="p-6 w-full md:w-1/3">
        <div key={i} className="flex">
          <img src={`/${ft.img}`} alt={ft.img} className="block w-16 h-16" />
          <div className="m-4">{ft.text}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto py-8 md:py-20">
        <h1 className="pb-8 md:pb-12 text-center">What you get</h1>
        <div className="flex flex-wrap mx-auto">
          {features.map((ft, i) => feature(ft, i))}
        </div>
      </div>
    </div>
  )
}

export default Features
