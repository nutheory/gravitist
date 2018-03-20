// @flow
import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite'
import faq from './styles/faq'

type Props = {
  faq: Object,
  index: number
}

type State = {
  expanded: boolean
}

class Faq extends Component<Props, State> {
  constructor(){
    super()
    this.state = {
      expanded: false
    }
  }

  componentDidMount(){
  }

  expandToggle(expanded: boolean){
    this.setState({ expanded }, (res) => {
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

    return (<div></div>
      // <Card
      //   containerStyle={{marginBottom: '1rem'}}
      //   onExpandChange={ this.expandToggle.bind(this) }
      //   style={this.state.expanded ? expanding : collapsing}
      // >
      //   <CardHeader
      //     title={`${this.props.faq.question} - ${this.state.expanded}`}
      //     titleStyle={{fontFamily: 'poppins-semibold'}}
      //     closeIcon={<Add />}
      //     openIcon={<Remove />}
      //     actAsExpander={true}
      //     showExpandableButton={true}
      //   />
      //   <CardText
      //     expandable={true}
      //   >
      //     {this.props.faq.answer}
      //   </CardText>
      // </Card>
    )
  }
}

export default Faq
