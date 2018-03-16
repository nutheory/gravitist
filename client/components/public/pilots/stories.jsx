// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const stories = [
  {img: require('../../../assets/images/1.jpg'), name: "Kevin Parks", location: "Los Angels, CA", qoute: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices at felis eu sollicitudin. Fusce ac arcu et eros" },
  {img: require('../../../assets/images/2.jpg'), name: "Glenn Arnold", location: "New York, NY", qoute: "Sed id tempus sapien. Sed pulvinar ipsum vel diam maximus, ac pretium nulla condimentum. Suspendisse rhoncus pellentesque libero." },
  {img: require('../../../assets/images/4.jpg'), name: "Jose Cole", location: "Los Angels, CA", qoute: "Pellentesque condimentum, nunc ut dapibus ultricies, eros metus dictum arcu, vel bibendum lectus mi eget magna. Etiam sit amet." },
  {img: require('../../../assets/images/1.jpg'), name: "Darrell Tran", location: "Miami, FL", qoute: "Nulla imperdiet mi ut nunc tincidunt cursus. Mauris ultrices purus quis ligula ultrices, cursus tristique tortor iaculis." }
]

const createStories = (story, i) => {
  return (
    <div key={`story_${i}`} className="flex p-6 w-full md:w-1/2">
      <div className="shadow w-full rounded bg-white p-6">
        <p className="text-xl">{`"${story.qoute}"`}</p>
        <div className="flex mt-4">
          <div className="w-12 h-12 rounded-full" style={{ background: `url(/${story.img}) no-repeat`, backgroundSize: 'cover' }}></div>
          <div className="ml-4">
            <h4 className="mt-1">{story.name}</h4>
            <h4 className="text-sm mt-1">{story.location}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

const Stories = () => {
  return(
    <div className="container mx-auto py-8 md:py-20">
      <h1 className="pb-8 md:pb-12 text-center">Pilot Sories</h1>
      <div className="flex flex-wrap mx-6 -mx-6">
        { stories.map((story, i) => createStories(story, i)) }
      </div>
    </div>
  )
}

export default Stories
