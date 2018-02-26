// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { pathOr } from 'ramda'
import lsf from './styles/form'

type Props = {
  removeFeature: Function,
  updateFeature: Function,
  feature: Object,
  idx: number
}

type State = {
  title?: string,
  value?: string
}

class FeatureForm extends Component<Props, State> {

  handleInputChange: Function
  handleRemoveClick: Function

  constructor(){
    super()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, function(){
      this.props.updateFeature({
        idx: this.props.idx,
        label: this.state.label,
        value: this.state.value
      })
    })
  }


  handleRemoveClick(){
    this.props.removeFeature(this.props.idx)
  }

  render(){
    return(
      <div className="w-full flex -mx-2 my-1">
        <div className="mx-2">
          <input
            type="text"
            className="w-full shadow-inner rounded-sm border text-lg border-grey px-3 py-2"
            placeholder="Ex. Garages"
            name="label"
            onChange={ this.handleInputChange }
            defaultValue={this.props.feature.label} />
        </div>
        <div className="mx-2">
          <input
            type="text"
            className="w-full shadow-inner rounded-sm border text-lg border-grey px-3 py-2"
            placeholder="3 car"
            name="value"
            onChange={ this.handleInputChange }
            defaultValue={this.props.feature.value} />
        </div>
        <div className="mx-2 mt-2">
          <a className="rounded-sm border border-grey px-3 py-2" onClick={this.handleRemoveClick}><i className="fa fa-times" /></a>
        </div>
      </div>
    )
  }
}

export default FeatureForm
