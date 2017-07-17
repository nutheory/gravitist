import React, { Component } from 'react'
import Header from '../../misc/header'
import { css } from 'aphrodite'
import cL from '../../../../styles/commonLayout'
import cF from '../../../../styles/commonForms'
import Uploads from './uploads'
import UserForm from '../../misc/user'
import PilotInfo from './pilot_info'

class PilotRegister extends Component {
  constructor(){
    super()
    this.state = {
      userVerified: false
    }

    this.setUserInfo = this.setUserInfo.bind(this)
    this.checkUserVerified = this.checkUserVerified.bind(this)
  }

  checkUserVerified(){
    if (this.state.name && this.state.email && this.state.password){
      this.setState({ userVerified: true})
    } else {
      this.setState({ userVerified: false})
    }
  }

  setUserInfo(user){
    this.setState({ ...user }, () => {
      this.checkUserVerified()
    })
  }

  render(){
    return(
      <div className={css(cL.centerMainContent)}>
        <Formsy.Form
          onValid={this.enableSubmitButton}
          onInvalid={this.disableSubmitButton}
        >
          <div className={css(cF.mainContainer)}>
            <Uploads />
            <UserForm setUserInfo={this.setUserInfo} />
            <PilotInfo />
          </div>
        </Formsy.Form>
      </div>
    )
  }
}

export default PilotRegister
