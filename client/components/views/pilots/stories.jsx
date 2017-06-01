import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from 'react-slick'
import st from './styles/stories'
import cL from '../../../styles/commonLayout'
import cT from '../../../styles/commonText'
import cE from '../../../styles/commonElements'
import photo1 from '../../../assets/images/1.jpg'
import photo2 from '../../../assets/images/2.jpg'
import photo4 from '../../../assets/images/4.jpg'

const Stories = () => {
  const storyList = [
    {img: photo1, name: "Kevin Parks", location: "Los Angels, CA", qoute: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices at felis eu sollicitudin. Fusce ac arcu et eros" },
    {img: photo2, name: "Glenn Arnold", location: "New York, NY", qoute: "Sed id tempus sapien. Sed pulvinar ipsum vel diam maximus, ac pretium nulla condimentum. Suspendisse rhoncus pellentesque libero." },
    {img: photo4, name: "Jose Cole", location: "Los Angels, CA", qoute: "Pellentesque condimentum, nunc ut dapibus ultricies, eros metus dictum arcu, vel bibendum lectus mi eget magna. Etiam sit amet." },
    {img: photo1, name: "Darrell Tran", location: "Miami, FL", qoute: "Nulla imperdiet mi ut nunc tincidunt cursus. Mauris ultrices purus quis ligula ultrices, cursus tristique tortor iaculis." }
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
          <Slider {...settings}>
            {storyList.map((sl, i) => {return story(sl, i)})}
          </Slider>
        </div>
      )
    }
  }

  return (
    <div className={css(cL.Container)}>
      <div className={css(cL.wrapper)}>
        <h2 className={css(cT.sectionHeader)}>Pilot Stories</h2>
        <div className={css(st.storyList)}>
          {stories()}
        </div>
      </div>
    </div>
  )
}

export default Stories
