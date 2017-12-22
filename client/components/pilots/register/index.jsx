import React, { Component } from 'react'
import Header from '../../misc/header'
import { css } from 'aphrodite'
import cL from '../../../styles/common_layout'
import cF from '../../../styles/common_forms'
import Uploads from './uploads'
import UserForm from '../../misc/user'
import ContactList from '../../misc/contact_list.jsx'
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
        {/* <ValidatorForm onSubmit={this.checkUserVerified}> */}
          <div className={css(cF.mainContainer)}>
            <Uploads />
            <UserForm setUserInfo={this.setUserInfo} />
            <ContactList contactsCollection={this.contactsCollection} />
            <PilotInfo />
            <div>
              {/* <Button
                raised
                color="primary"
                onClick={this.handleSubmit}
                // disabled={ !this.state.canSubmit }
              >Signup</Button> */}
            </div>
          </div>
        {/* </ValidatorForm> */}
      </div>
    )
  }
}

export default PilotRegister
