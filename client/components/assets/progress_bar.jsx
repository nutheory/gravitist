// @flow
import React from 'react'
import { css } from 'aphrodite'
import prg from './styles/progress'

type Props = {
  progress: number
}

const ProgressBar = (props: Object) => {
  const percent = Math.floor(props.progress * 100)
  return (
    <div className={`${css(prg.bg)}`}>
      <div className={`${css(prg.border)}`}></div>
      <div className={`${css(prg.bar)}`} style={{ left: `${-106 + percent}%` }}>
        <div className={`${css(prg.percent)}`}>{ percent }%</div>
      </div>
    </div>
  )
}

export default ProgressBar
