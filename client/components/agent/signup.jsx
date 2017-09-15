import React, { Component } from 'react'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import cF from '../../styles/common_forms'
import style from './styles/signup'
import ContactList from '../misc/contact_list.jsx'
import User from '../misc/user.jsx'

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      // user: {},
      // contacts: [],
    }

    this.setUserInfo = this.setUserInfo.bind(this)
    this.contactsCollection = this.contactsCollection.bind(this)
  }


  setUserInfo(user){
    this.props.setUserInfo(user)
  }

  contactsCollection(contacts){
    this.setState({ contacts }, () => {
      console.log("contactsCollection", this.state)
    })
  }

  componentDidMount(){
    console.log('refs', this.props.plan)
    this.setState({ plan: this.props.plan })
  }

  render(){
    return(
      <div className={css(cF.container)}>
        <div>
          <h4 className={css(cF.subtitle)}>User info</h4>
          <User setUserInfo={this.setUserInfo} />
        </div>
        <div>
          <h4 className={css(cF.subtitle)}>Contact info</h4>
          <ContactList contactsCollection={this.contactsCollection} />
        </div>
      </div>
    )
  }
}

export default Signup
