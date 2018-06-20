// @flow
import React from "react"
import { Link } from 'react-router-dom'
import SocialImg from '../../../assets/svg/social_group.svg'
import FortyEightImg from '../../../assets/svg/48_blue.svg'
import DroneImg from '../../../assets/svg/drone_purple.svg'

const InAddition = (props: Object) => {
  const features = [
    { img: DroneImg,
      color: "#572072",
      title: "FAA licensed and fully insured pilots",
      text: "We require all of our pilots provide us valid documentation showing proof of being licensed and insurance before wel let them accept missions." },
    { img: FortyEightImg,
      color: "#0C93D1",
      title: "Guaranteed 72 hour turnaround for all orders",
      text: "Most filmings happen within 48 hours. However because of certain weather conditions we will refund any filming not done within 72 hours." },
    { img: SocialImg,
      color: "#00BA9D",
      title: "Social sharing tools",
      text: "Being a real estate agent means selling yourself as a brand much as selling any property. For this reason we attach your photo and contact details to every filming as well as giving you unbranded images and video." },
  ]

  return(
    <div className="container mx-auto py-12 px-6 md:px-0" ref={props.benefitsRef}>
      <h1 className="pb-8 md:pb-12 text-center font-light text-grey-darker">We also Provide</h1>
      <div className="flex flex-wrap -mx-8">
        { features.map((ft, i) => (
          <div className="w-full md:w-1/3 px-8" key={`feature_${i}`}>
            <div>
              <div className="text-center my-2 h-16"><img src={ft.img} /></div>
              <div className="text-2xl font-light" style={{ color: ft.color }}>{ft.title}</div>
              <div className="text-lg mt-3 text-grey-darker">{ft.text}</div>
            </div>
          </div>
        )) }
        <div className="my-12 w-2/3 md:w-1/3 mx-auto">
          <Link className=" action-button button-green p-4" to="/pricing/order/standard">
            <span className=" action-button-overlay"></span>
            Order now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InAddition
