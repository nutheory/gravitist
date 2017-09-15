import React, { Component } from 'react'
import { css } from 'aphrodite'
import Slider from 'react-slick'
import Header from '../misc/header'
import love from './styles/our_clients_love_us'
import cT from '../../styles/common_text'
import cL from '../../styles/common_layout'

const OurClientsLoveUs = () => {

  const testimonials = [
    { img: require('../../assets/images/1.jpg'), name: "Rosetta Day", title: "CEO of BestHouse", rating: 5, qoute: "Thank You! I like HomeFilming more and more each day because it makes my life a lot easier. Very easy to use." },
    { img: require('../../assets/images/2.jpg'), name: "Owen Parker", title: "CEO of Trulia", rating: 5, qoute: "I would like to personally thank you for your outstanding service." },
    { img: require('../../assets/images/4.jpg'), name: "Lily Howell", title: "CEO of Zillow", rating: 4, qoute: "HomeFilming should be nominated for service of the year. I use HomeFilming often." }
  ]

  const mainLayout = (test, i) => {
    return (
      <div key={`inner_${i}`}>
        <div className={css(love.head)}>
          <div className={css(love.avatar)} style={{ background: `url(/${test.img}) no-repeat`, backgroundSize: '100px', backgroundPosition: '-20px 0px'}}></div>
          <h3 className={css(love.name)}>{test.name}</h3>
          <p className={css(love.title)}>{test.title}</p>
          {[...Array(test.rating)].map((ar, i) => {
            return (
              <img key={`star_${i}`} src={require('../../assets/svg/star.svg')} alt="star" className={css(love.starImg)} style={{display: 'inline'}} />
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
      <div className={css(cL.wrapper)}>
        <Header title="Our Clients Love Us" />
        <div className={css(love.innerContainer)}>
          {testimonial()}
        </div>
      </div>
    </div>
  )
}

export default OurClientsLoveUs
