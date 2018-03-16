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
    <div className="border border-blue-darker bg-blue-lightest p-4 rounded-lg">
      <div className="flex mb-4">
        <div className="text-5xl w-32 text-right font-bold">{percent}%</div>
        <div className="flex-1 ml-4">
          <div className="font-bold text-sm mb-1">Uploading</div>
          <p className="text-sm">Please be patient while we upload your video.
            After your upload completes we will review your video,
            and get back to you within 24 hours.</p>
        </div>
      </div>
      <div className="pb-progress">
        <div className="pb-progress-bar" style={{ width: `${0 + percent}%` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar
