import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import cE from '../../styles/common_elements'

const scrollDown = (props) => {
  return (
    <div className={css(cE.scrollDown)}>
      <div className={css(cE.scrollDownInner)}>
        <NavLink
          to={props.to}
        >
          <img src={require('../../assets/svg/scrollDown.svg')} className={css(cE.scrollDownIcon)} alt="scroll" /><br />
          <span className={css(cE.scrollDownText)}>Scroll Down to Learn More</span>
          </NavLink>
      </div>
    </div>
  )
}

export default scrollDown
