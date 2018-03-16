// @flow
import React from 'react'
import moneyImg from '../../../assets/svg/money.svg'
import buyersImg from '../../../assets/svg/buyers.svg'
import listingsImg from '../../../assets/svg/listings.svg'
import standOutImg from '../../../assets/svg/standOut.svg'

const Benefits = () => {

  const benefits = [
    { img: moneyImg, text: 'Your listing sells faster and you get paid sooner' },
    { img: buyersImg, text: 'You get better buyers, better showings, fewer looky loos' },
    { img: listingsImg,  text: 'You get more listings and better listings' },
    { img: standOutImg,  text: 'You will be stand out from the competition' }
  ]

  const createBullets = (benefit, i) => {
    return (
      <div key={`benefit_${i}`} className="flex w-full md:w-1/4 px-4 py-4 md:pb-8">
        <div className="shadow w-full rounded bg-white py-8">
          <img src={ benefit.img } className="block h-16 w-16 mx-auto" />
          <p className="text-center text-sm mx-6 mt-4">{benefit.text}</p>
        </div>
      </div>
    )
  }

  return(
    <div className="container mx-auto py-8 md:py-20">
      <h1 className="text-center pb-8 md:pb-12">Aerial Imagery Sells</h1>
      <div className="flex flex-wrap mx-4 lg:-mx-4">
        { benefits.map((ben, i) => createBullets(ben, i)) }
      </div>
    </div>
  )

}

export default Benefits
