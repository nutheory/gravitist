// @flow
import React from "react"
import buyersImg from '../../../assets/svg/buyers_teal.svg'
import listingsImg from '../../../assets/svg/listings_blue.svg'
import standOutImg from '../../../assets/svg/stand_purple.svg'

const AgentAdvantages = (props: Object) => {
  const features = [
    { img: listingsImg,
      color: "#0C93D1",
      title: "You get more listings and better listings",
      text: "Aerial Imagery says something about the type of listings you tend to represent on the whole. Not all homes need to be seen from the air, however those that do look AMAZING!" },
    { img: buyersImg,
      color: "#00BA9D",
      title: "Your listing sells faster and you get paid sooner",
      text: "The more excitement you can create around a listing the better the chance you can get what your asking for the property. While at the same time excelerating the sales process. " },
    { img: standOutImg,
      color: "#572072",
      title: "All media is personalized with contact info and your likeness",
      text: "Being a real estate agent means selling yourself as a brand much as selling any property. For this reason we attach your photo and contact details to every filming as well as giving you unbranded images and video." },
  ]

  return(
    <div className="container mx-auto py-12 md:py-20 px-6 md:px-0" ref={props.advantageRef}>
      <h1 className="pb-8 md:pb-12 text-center font-light text-grey-darker">Advantages of Aerial Imagery</h1>
      <div className="flex flex-wrap -mx-8">
        { features.map((ft, i) => (
          <div className="w-full md:w-1/3 px-8" key={`feature_${i}`}>
            <div>
              <div className="text-center my-4"><img src={ft.img} /></div>
              <div className="text-2xl font-light" style={{ color: ft.color }}>{ft.title}</div>
              <div className="text-lg mt-3 text-grey-darker">{ft.text}</div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default AgentAdvantages
