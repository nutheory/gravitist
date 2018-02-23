import React from 'react'
import { css } from 'aphrodite'


const Features = (features) => {
  return (
    <ul className={css(styles.features)}>
      {features.map((feat, i) => {
        return (
          <li key={i} className={css(styles.feature)}>
            <i className={`${css(styles.icon)} ${feat.icon} fa-2x`} />
            <p className={css(styles.featureDesc)}>{feat.desc}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default Features
