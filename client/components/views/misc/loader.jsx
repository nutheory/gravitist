import React from 'react'
import '../../../styles/loader.sass'
import qlLogo from '../../../assets/svg/GraphQL_Logo.svg'


const Loader = () => {
  return (
    <div className="load-spinner-main">
      <div className="circle-spinner">
        <div className="inner-spinner"></div>
      </div>
      <div className="circle-spinner">
        <div className="inner-spinner"></div>
      </div>
      <div className="circle-spinner">
        <div className="inner-spinner"></div>
      </div>
      <div className="circle-spinner">
        <div className="inner-spinner"></div>
      </div>
      <div className="circle-spinner">
        <div className="inner-spinner"></div>
      </div>
    </div>
  )
}

export default Loader
