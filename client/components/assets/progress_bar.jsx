import React from 'react'
import { css } from 'aphrodite'
import prg from './styles/progress'
import './styles/progressbar.scss'


type Props = {
  progress: number
}

const ProgressBar = (props: Object) => {
  const percent = Math.floor(props.progress * 100)
  return (
    <div className={css(prg.progressArea)}>
      <div className={css(prg.content)}>
        <div className={css(prg.percent)}>
          {percent}%
        </div>
        <div className={css(prg.info)}>
          <h1 className={css(prg.infoHeader)}>Uploading</h1>
          <p>Please be patient while we upload your video.
            After your upload completes we will review your video,
            and get back to you within 24 hours.</p>
        </div>
      </div>
      <div className={css(prg.progressBar)}>
        <div className="chart">
          <div className="bar red cyan-face">
            <div className="face top">
              <div className="growing-bar" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="face side-0">
              <div className="growing-bar" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="face floor">
              <div className="growing-bar" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="face side-a"></div>
            <div className="face side-b"></div>
            <div className="face side-1">
              <div className="growing-bar" style={{ width: `${percent}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className={`${css(prg.bg)}`}>
    //   <div className={`${css(prg.border)}`}></div>
    //   <div className={`${css(prg.bar)}`} style={{ left: `${-106 + percent}%` }}>
    //     <div className={`${css(prg.percent)}`}>{ percent }%</div>
    //   </div>
    // </div>
  )
}

export default ProgressBar
