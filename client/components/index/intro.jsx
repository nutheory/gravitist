import React, { Component } from 'react'
<<<<<<< HEAD
=======
import { NavLink } from 'react-router-dom'
>>>>>>> new
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet, css } from 'aphrodite'
import styles from './styles/intro'
import formStyles from '../../styles/forms'
<<<<<<< HEAD
import houseVideo from '../../assets/bg.mp4'
import logo from '../../assets/logo.svg'
=======
import houseVideo from '../../assets/bg.m4v'
>>>>>>> new
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

<<<<<<< HEAD
        <video playsInline autoPlay muted loop className={css(styles.video)}>
=======
        <video playsInline autoPlay className={css(styles.video)}>
>>>>>>> new
          <source src={houseVideo} type="video/mp4" />
        </video>

        <div className={css(styles.container)}>
<<<<<<< HEAD
          <img src={logo} className={css(styles.logo)} />
          <h1 className={css(styles.title)}>Aerial Photos and Videos for Residential Real Estate Agents</h1>
          <h3 className={css(styles.text)}>Sell your listing faster. Get paid sooner. Get more and better listings. Stand out from the competition.</h3>
          <TextField
=======
          <div>
            <h1 className={css(styles.title)}>Aerial Photos and Videos for Residential Real Estate Agents</h1>
          </div>
          <div>
            <h3 className={css(styles.text)}>Sell your listing faster. Get paid sooner. Get more and better listings. Stand out from the competition.</h3>
          </div>
          <div className={css(styles.buttons)}>
            <NavLink to="/signup" className={css(styles.getStarted)}>
              Get Started
            </NavLink>
          </div>
          {/* <TextField
>>>>>>> new
            id="address"
            className={css(styles.input)}
            floatingLabelText="Enter Property Address"
            underlineStyle={{ border: '1px solid #5CC9FF' }}
            underlineFocusStyle={{border: '2px solid #5CC9FF'}}
            floatingLabelFocusStyle={{color: '#5CC9FF', textShadow: '2px 2px #666'}}
<<<<<<< HEAD
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
=======
          /> */}
>>>>>>> new
        </div>
      </div>
    )
  }
}

export default IndexIntro
