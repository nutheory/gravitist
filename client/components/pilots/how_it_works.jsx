import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'
import cE from '../../styles/common_elements'
import hiw from './styles/how_it_works'

const instructions = [
  {icon: 'handshake-o', bg: cE.gradRed, text: "Accept the mission" },
  {icon: 'plane', bg: cE.gradBlue, text: "Fly the house" },
  {icon: 'cloud-upload', bg: cE.gradGreen, text: "Upload the photos and video" },
  {icon: 'usd', bg: cE.gradOrange, text: "The listing sells and you get paid" }
]

const stories = [
  {img: require('../../assets/images/1.jpg'), name: "Kevin Parks", location: "Los Angels, CA", qoute: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices at felis eu sollicitudin. Fusce ac arcu et eros" },
  {img: require('../../assets/images/2.jpg'), name: "Glenn Arnold", location: "New York, NY", qoute: "Sed id tempus sapien. Sed pulvinar ipsum vel diam maximus, ac pretium nulla condimentum. Suspendisse rhoncus pellentesque libero." },
  {img: require('../../assets/images/4.jpg'), name: "Jose Cole", location: "Los Angels, CA", qoute: "Pellentesque condimentum, nunc ut dapibus ultricies, eros metus dictum arcu, vel bibendum lectus mi eget magna. Etiam sit amet." },
  {img: require('../../assets/images/1.jpg'), name: "Darrell Tran", location: "Miami, FL", qoute: "Nulla imperdiet mi ut nunc tincidunt cursus. Mauris ultrices purus quis ligula ultrices, cursus tristique tortor iaculis." }
]

const createStoriesBullets = (story, i) => {
  return (
    <div key={i} className={css(cE.bullet)}>
      <div className={css(cE.imgIconWrapper, cE.gradButton)} style={{ background: `url(/${story.img}) no-repeat`, backgroundSize: 'cover' }}></div>
      <div className={css(hiw.bulletListText)}>
        <p className={css(hiw.qoute)}>{`"${story.qoute}"`}</p>
        <div>
          <h3 className={css(hiw.name)}>{story.name}</h3>
          <h4 className={css(hiw.location)}>{story.location}</h4>
        </div>
      </div>
    </div>
  )
}

const createHiwBullets = (sp, i) => {
  return (
    <div key={i} className={css(cE.bullet)}>
      <div className={css(cE.imgIconWrapper, cE.gradButton, sp.bg)}>
        <i className={`${css(cE.iconFix)} fa fa-${sp.icon} fa-2x`} />
      </div>
      <div className={css(cT.bulletListText)}>{sp.text}</div>
    </div>
  )
}

const HowItWorks = () => {
  return (
    <div className={css(cE.twoColumnLists)}>
      <div className={css(cE.bulletList)}>
        <div className={css(cL.wrapper)}>
          <div className={css(cT.bulletListTitle)}>How it works</div>
          <div className={css(cE.fourBoxArea)}>
            {instructions.map((ins, i) => { return createHiwBullets(ins, i) } )}
          </div>
          <div className={css(hiw.button)}>
            <span className={css(cE.ctaButtonOverlay)}></span>
            <Link to="/pilots/register" className={css(cE.ctaButton, cE.ctaPurple)}>Fly With Us</Link>
          </div>
        </div>
      </div>
      <div className={css(cE.bulletList)}>
        <div className={css(cL.wrapper)}>
          <div className={css(cT.bulletListTitle)}>Pilot Stories</div>
          <div className={css(cE.fourBoxArea)}>
            {stories.map((story, i) => { return createStoriesBullets(story, i) } )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
