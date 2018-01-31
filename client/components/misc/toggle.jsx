// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import tgl from '../../styles/toggle.css'

type Props = {
  toggleState: boolean,
  returnToggleResult: Function
}

type State = {
  checked?: boolean
}

class Toggle extends Component<Props, State> {

  handleToggleChange: Function

  constructor(props: Object){
    super(props)
    this.state = {
    }

    this.handleToggleChange = this.handleToggleChange.bind(this)
  }

  handleToggleChange(){
    // this.setState({ checked: !this.state.checked }, function(){
    this.props.returnToggleResult(this.props.toggleState)
    // })
  }

  // componentWillReceiveProps(){
  //   this.setState({ checked: this.props.toggleState })
  // }

  render(){
    console.log('VIEWToggle', this.props.toggleState)
    return (
      <div >
        <label className='checkboxControl'>
    			<input type='checkbox' checked={this.props.toggleState} onChange={this.handleToggleChange} />
    			<div>ΟΙ</div><b></b>
    			<span className='indicator'></span>
    		</label>
      </div>
    )
  }
}

export default Toggle
