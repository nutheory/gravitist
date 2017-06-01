import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import scrollDownIcon from '../../../assets/svg/scrollDown.svg'
import cE from '../../../styles/commonElements'

const scrollDown = (props) => {
  console.log('props', props)
  return (
    <div className={css(cE.scrollDown)}>
      <div className={css(cE.scrollDownInner)}>
        <NavLink
          to={props.to}
        >
          <img src={`/${scrollDownIcon}`} className={css(cE.scrollDownIcon)} alt="scroll" /><br />
          <span className={css(cE.scrollDownText)}>Scroll Down to Learn More</span>
          </NavLink>
      </div>
    </div>
  )
}

export default scrollDown
