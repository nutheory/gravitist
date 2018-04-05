// @flow
import React from 'react'

const Share = () => {
  const social = [
    {src: require('../../../assets/svg/facebook.svg'), name: "Facebook"},
    {src: require('../../../assets/svg/twitter.svg'), name: "Twitter"},
    {src: require('../../../assets/svg/instagram.svg'), name: "Instagram"},
    {src: require('../../../assets/svg/tumblr.svg'), name: "Tumbler"},
    {src: require('../../../assets/svg/snapchat.svg'), name: "Snapchat"}
  ]
  return (
    <div className="bg-white">
      <div className="py-8 container mx-auto">
        <h2 className="text-center pb-8">Share Your Videos</h2>
        <div className="flex flex-wrap w-full lg:w-4/5 mx-auto">
        {social.map((s, i) => {
          return (
            <div key={`pill_${i}`} className="w-full sm:w-1/2 md:w-1/5 p-4">
              <div className="flex rounded-full border border-grey-darkest py-2 px-4">
                <div className="inline-block mr-3"><img src={`/${s.src}`} alt={`${s.name}`} className="w-6 h-6" /></div>
                <div className="inline-block mt-1">{s.name}</div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default Share
