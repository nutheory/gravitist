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
      <div className="columns">
        <div className="column">
          <div className="field">
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Ex. Garages"
                name="label"
                onChange={ this.handleInputChange }
                defaultValue={this.props.feature.label} />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="3 car"
                name="value"
                onChange={ this.handleInputChange }
                defaultValue={this.props.feature.value} />
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <a className="button" onClick={this.handleRemoveClick}><i className="fa fa-times" /></a>
        </div>
      </div>
    )
  }
}

export default FeatureForm