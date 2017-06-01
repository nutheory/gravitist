import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from 'react-slick'
import love from './styles/loveUs'
import cT from '../../../styles/commonText'
import star from '../../../assets/svg/star.svg'
import photo1 from '../../../assets/images/1.jpg'
import photo2 from '../../../assets/images/2.jpg'
import photo4 from '../../../assets/images/4.jpg'

const OurClientsLoveUs = () => {

  const testimonials = [
    { img: photo1, name: "Rosetta Day", title: "CEO of BestHouse", rating: 5, qoute: "Thank You! I like HomeFilming more and more each day because it makes my life a lot easier. Very easy to use." },
    { img: photo2, name: "Owen Parker", title: "CEO of Trulia", rating: 5, qoute: "I would like to personally thank you for your outstanding service." },
    { img: photo4, name: "Lily Howell", title: "CEO of Zillow", rating: 4, qoute: "HomeFilming should be nominated for service of the year. I use HomeFilming often." }
  ]

  const mainLayout = (test, i) => {
    console.log(i, test.name)
    return (
      <div key={`inner_${i}`}>
        <div className={css(love.head)}>
          <div className={css(love.avatar)} style={{ background: `url(/${test.img}) no-repeat`, backgroundSize: '100px', backgroundPosition: '-20px 0px'}}></div>
          <h3 className={css(love.name)}>{test.name}</h3>
          <p className={css(love.title)}>{test.title}</p>
          {[...Array(test.rating)].map((ar, i) => {
            return (
              <img key={`star_${i}`} src={star} alt="star" className={css(love.starImg)} style={{display: 'inline'}} />
            )
          })}
        </div>
        <div className={css(love.body)}>
          <div className={css(love.qoute)}>"{test.qoute}"</div>
        </div>
      </div>
    )
  }

  const testimonial = () => {
    let width = window.innerWidth
    if(width > 1023){
      return testimonials.map((test, i) => {
        if(i === 1){
          return (
            <div className={css(love.outerBoxTall)} key={`testimonial_${i}`}>
              {mainLayout(test, i)}
            </div>
          )
        } else {
          return (
            <div className={css(love.outerBoxShort)} key={`testimonial_${i}`}>
              {mainLayout(test, i)}
            </div>
          )
        }
      })
    } else {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
      return (
        <div className={css(love.outerBoxTall)}>
          <Slider {...settings}>
            {testimonials.map((test, i) => {
              return mainLayout(test, i)
            })}
          </Slider>
        </div>
      )
    }
  }

  return (
    <div className={css(love.container)}>
      <h2 className={css(cT.sectionHeader)}>Our Clients Love Us</h2>
      <div className={css(love.innerContainer)}>
        {testimonial()}
      </div>
    </div>
  )
}

export default OurClientsLoveUs
