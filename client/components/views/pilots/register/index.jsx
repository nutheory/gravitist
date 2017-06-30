import React, { Component } from 'react'
import Header from '../../misc/header'
import cL from '../../../../styles/commonLayout'
import cF from '../../../../styles/commonForms'

class PilotRegister extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className={css(cL.centerMainContent)}>
        <Formsy.Form>
          <Header title="Fly with us" />
          {/* user info */}
          {/* legal docs */}
          {/* get paid */}
        </Formsy.Form>
      </div>
    )
  }
}

export default PilotRegister
