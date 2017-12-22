import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Header from '../misc/header'
import st from './styles/stories'
import cL from '../../styles/common_layout'
import cT from '../../styles/common_text'
import cE from '../../styles/common_elements'

const Stories = () => {
  const storyList = [
    {img: require('../../assets/images/1.jpg'), name: "Kevin Parks", location: "Los Angels, CA", qoute: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices at felis eu sollicitudin. Fusce ac arcu et eros" },
    {img: require('../../assets/images/2.jpg'), name: "Glenn Arnold", location: "New York, NY", qoute: "Sed id tempus sapien. Sed pulvinar ipsum vel diam maximus, ac pretium nulla condimentum. Suspendisse rhoncus pellentesque libero." },
    {img: require('../../assets/images/4.jpg'), name: "Jose Cole", location: "Los Angels, CA", qoute: "Pellentesque condimentum, nunc ut dapibus ultricies, eros metus dictum arcu, vel bibendum lectus mi eget magna. Etiam sit amet." },
    {img: require('../../assets/images/1.jpg'), name: "Darrell Tran", location: "Miami, FL", qoute: "Nulla imperdiet mi ut nunc tincidunt cursus. Mauris ultrices purus quis ligula ultrices, cursus tristique tortor iaculis." }
  ]

  const story = (story, i) => {
    return (
      <div key={`story_${i}`} className={css(st.innerContainer)}>
        <div className={css(st.avatar)} style={{ background: `url(/${story.img}) no-repeat` }}>
        </div>
        <div className={css(st.nameLocation)}>
          <h3 className={css(st.name)}>{story.name}</h3>
          <h4 className={css(st.location)}>{story.location}</h4>
        </div>
        <p className={css(st.qoute)}>{`"${story.qoute}"`}</p>
      </div>
    )
  }

  const stories = () => {
    let width = window.innerWidth
    if(width > 639){
      return storyList.map((sl, i) => {
        return (
          <div key={`story_${i}`} className={css(st.storyFrame)}>
            {story(sl, i)}
          </div>
        )
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
        <div className={css(st.storyFrame)}>
          {/* <Slider {...settings}>
            {storyList.map((sl, i) => {return story(sl, i)})}
          </Slider> */}
        </div>
      )
    }
  }

  return (
    <div className={css(cL.Container)}>
      <div className={css(cL.wrapper)}>
        <Header title="Pilot Stories" />
        <div className={css(st.storyList)}>
          {stories()}
        </div>
      </div>
    </div>
  )
}

export default Stories
