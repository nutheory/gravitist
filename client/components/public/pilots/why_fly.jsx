// @flow
import React from 'react'
import MoneyImg from '../../../assets/svg/makemoney_teal.svg'
import CalendarImg from '../../../assets/svg/calendar_blue.svg'
import UploadImg from '../../../assets/svg/upload_purple.svg'

const WhyFly = (props: Object) => {
  const features = [
    { img: MoneyImg,
      color: "#00BA9D",
      title: "Get paid to do what you already love to do anyway",
      text: "Aerial filming can be extremely fun and in a lot of ways is an art form. Might as well get paid while you perfect your art? We also have same day payout for all missions completed." },
    { img: CalendarImg,
      color: "#0C93D1",
      title: "Fly when you want, and as often as you want",
      text: "We understand that drone piloting is a hobby for most people so we give you a reasonable time frame of 48-hours to fly a mission. The only catch is that you fly during daylight hours." },
    { img: UploadImg,
      color: "#572072",
      title: "Super simple to use, and mobile friendly",
      text: "Gonna be out and about all day, accept a few missions and upload all filmings when you get back home for bigger payouts. Thats it, just upload a 5-min fly over for each mission and get paid." },
  ]

  return(
    <div className="container mx-auto py-12 md:py-20 px-6 md:px-0" ref={props.whyFlyRef}>
      <h1 className="pb-8 md:pb-12 text-center font-light text-grey-darker">Why Fly with Us</h1>
      <div className="flex flex-wrap -mx-8">
        { features.map((ft, i) => (
          <div className="w-full md:w-1/3 px-8" key={`feature_${i}`}>
            <div>
              <div className="text-center my-4 h-16"><img src={ft.img} /></div>
              <div className="text-2xl font-light" style={{ color: ft.color }}>{ft.title}</div>
              <div className="text-lg mt-3 text-grey-darker">{ft.text}</div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default WhyFly
