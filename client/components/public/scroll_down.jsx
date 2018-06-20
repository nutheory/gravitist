// @flow
import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import cE from '../../styles/common_elements'

const scrollDown = (props: Object) => {
  return (
    <div className="absolute pin-b pb-4 flex justify-center w-8 brighten hover:cursor-pointer" onClick={props.jumpStart}>
      <img src={`/${require('../../assets/svg/arrow-down.svg')}`}  alt="scroll" /><br />
    </div>
  )
}

export default scrollDown
