import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'
import faq from './styles/faq'
import cT from '../../../styles/commonText'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'

class Faq extends Component {
  constructor(){
    super()
    this.state = {
      expanded: false
    }
  }

  componentDidMount(){
    console.log('prps', this.props)
  }

  expandToggle(expanded){
    this.setState({ expanded }, (res) => {
      console.log('evt', this.state.expanded)
    })
  }

  render(){
    let expanding = {
      overflowY: 'hidden',
	    maxHeight: '500px',
	    transitionProperty: 'all',
	    transitionDuration: '2s',
	    transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
    }
    let collapsing = {
      overflowY: 'hidden',
      maxHeight: '48px',
      transitionProperty: 'all',
      transitionDuration: '2s',
      transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
    }

    return (
      <Card
        containerStyle={{marginBottom: '1rem'}}
        onExpandChange={ this.expandToggle.bind(this) }
        style={this.state.expanded ? expanding : collapsing}
      >
        <CardHeader
          title={`${this.props.faq.question} - ${this.state.expanded}`}
          titleStyle={{fontFamily: 'poppins-semibold'}}
          closeIcon={<Add />}
          openIcon={<Remove />}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          expandable={true}
        >
          {this.props.faq.answer}
        </CardText>
      </Card>
    )
  }
}

export default Faq
