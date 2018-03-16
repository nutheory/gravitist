// @flow
import React, { Component } from 'react'


const OurClientsLoveUs = () => {

  const testimonials = [
    { img: require('../../../assets/images/1.jpg'), name: "Rosetta Day", title: "CEO of BestHouse", rating: 5, qoute: "Thank You! I like HomeFilming more and more each day because it makes my life a lot easier. Very easy to use." },
    { img: require('../../../assets/images/2.jpg'), name: "Owen Parker", title: "CEO of Trulia", rating: 5, qoute: "I would like to personally thank you for your outstanding service." },
    { img: require('../../../assets/images/4.jpg'), name: "Lily Howell", title: "CEO of Zillow", rating: 4, qoute: "HomeFilming should be nominated for service of the year. I use HomeFilming often." }
  ]

  const testimonial = (test, i) => {
    return (
      <div className={`w-full md:w-1/3 justify-center ${i === 1 ? 'rounded border-grey-darker shadow bg-white' : ''}`} key={`testimonial_${i}`}>
        <div className="text-center p-8 border-b">
          <div className="rounded-full h-16 w-16 mx-auto" style={{ background: `url(/${test.img}) no-repeat`, backgroundSize: '100px', backgroundPosition: '-20px 0px'}}></div>
          <h3 className="mt-4 text-center">{test.name}</h3>
          <p className="text-center">{test.title}</p>
          {[...Array(test.rating)].map((ar, i) => {
            return (
              <img key={`star_${i}`}
                src={require('../../../assets/svg/star.svg')}
                alt="star"
                className="inline mt-4 w-4 h-4" />
            )
          })}
        </div>
        <div className="p-8 text-center">"{test.qoute}"</div>
      </div>
    )
  }

  return (
    <div className="py-20 container mx-auto">
      <h1 className="pb-12 text-center">Our clients love us</h1>
      <div className="flex flex-wrap w-4/5 mx-auto">
        { testimonials.map((test, i) => testimonial(test, i)) }
      </div>
    </div>
  )
}

export default OurClientsLoveUs
