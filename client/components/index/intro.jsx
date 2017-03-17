import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import styles from '../../styles/index/intro'
import formStyles from '../../styles/forms'
import houseVideo from '../../assets/bg.mp4'
import logo from '../../assets/logo.svg'
import {
  pink500,
  blue500,
  red900,
  deepPurple700,
  lightGreen200,
  lightGreenA700,
  blueGrey100,
  blueGrey400
} from 'material-ui/styles/colors'



class IndexIntro extends Component {
  render(){
    return(
      <div id="intro" className={css(styles.introContainer)}>

        <video playsInline autoPlay muted loop className={css(styles.video)}>
          <source src={houseVideo} type="video/mp4" />
        </video>

        <div className={css(styles.container)}>
          <img src={logo} className={css(styles.logo)} />
          <h1 className={css(styles.title)}>Aerial Photos and Videos for Residential Real Estate Agents</h1>
          <h3 className={css(styles.text)}>Sell your listing faster. Get paid sooner. Get more and better listings. Stand out from the competition.</h3>
          <TextField
            id="address"
            className={css(styles.input)}
            floatingLabelText="Enter Property Address"
            underlineStyle={{ border: '1px solid #5CC9FF' }}
            underlineFocusStyle={{border: '2px solid #5CC9FF'}}
            floatingLabelFocusStyle={{color: '#5CC9FF', textShadow: '2px 2px #666'}}
          />
          <div className={css(styles.buttons)}>
            <RaisedButton
              label="Returning Customer"
              className={css(styles.returning)}
              backgroundColor={blueGrey400}
              labelColor="#fff"
            />
            <RaisedButton
              label="Get Started"
              className={css(styles.getStarted)}
              backgroundColor={lightGreenA700}
              labelColor="#fff"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default IndexIntro
