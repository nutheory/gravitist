import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../styles/index/intro'
// import coltVideo from '../../assets/bg.mp4'
import creativeImg from '../../assets/creative.svg'
import functionalImg from '../../assets/functional.svg'
import fullstackImg from '../../assets/fullstack.svg'
import developmentImg from '../../assets/development.svg'
import machineImg from '../../assets/machine.svg'


class IndexIntro extends Component {
  render(){
    return(
      <div id="intro" className={css(styles.introContainer)}>

        {/* <video playsInline autoPlay muted loop className={css(styles.video)}>
          <source src={coltVideo} type="video/mp4" />
        </video> */}

        <div className={css(styles.titleContainer)}>
          <div className={css(styles.title)}><img src={creativeImg} /></div>
          <div className={css(styles.title)}><img src={functionalImg} /></div>
          <div className={css(styles.title)}><img src={fullstackImg} /></div>
          <div className={css(styles.title)}><img src={developmentImg} />
            <div className={css(styles.machine)}><img src={machineImg} className={css(styles.machineResize)} /></div>
          </div>
        </div>

      </div>
    )
  }
}

export default IndexIntro
