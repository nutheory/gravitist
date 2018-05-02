// @flow
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

type Props = {
  match?: Object,
  pageSize?: number,
  recordCount?: number,
  pageNumber?: number
}

type State = {
  currentRoot: string
}

class Pagination extends Component<Props, State> {


  handleInputChange: Function

  constructor(props: Object){
    super(props)

    this.state ={
      currentRoot: this.props.match.path.split('/:')[0]
    }


    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(){}


  render(){
    console.log(this.state.currentRoot)
    const pageCount = Math.ceil(this.props.recordCount/this.props.pageSize)
    const modifiedPageNumber = this.props.pageNumber - 1
    const startNumber = (modifiedPageNumber * this.props.pageSize) + 1
    const maxEndNumber = this.props.pageNumber * this.props.pageSize
    const endNumber = this.props.recordCount > maxEndNumber  ? maxEndNumber  : this.props.recordCount
    console.log(startNumber)
    console.log(endNumber)
    if(startNumber > endNumber){ return <Redirect to={`${this.state.currentRoot}/1`} /> }
    return(
      <div className="flex">
        <div className="flex-1">
          <div className="inline-block">
            { modifiedPageNumber > 0 ?
            <li className="inline-block">
              <Link
              className="inline-block border rounded py-1 px-3 mx-1"
              to={`${this.state.currentRoot}/${parseInt(this.props.pageNumber)-1}`} >Prev</Link>
            </li>
            : null }
            {[...Array(pageCount)].map((x, i) => (
              <Link
                className="inline-block border rounded py-1 px-3 mx-1"
                key={`page_${i}`}
                to={`${this.state.currentRoot}/${i+1}`} >{`${ i + 1 }`}</Link>
            ))}
            { this.props.pageNumber < pageCount ?
              <li className="inline-block">
                <Link
                className="inline-block border rounded py-1 px-3 mx-1"
                to={`${this.state.currentRoot}/${parseInt(this.props.pageNumber)+1}`} >Next</Link>
              </li>
            : null }
          </div>
        </div>
        <div className="text-right">
          Showing { startNumber } to { endNumber } of { this.props.recordCount }
        </div>
      </div>
    )
  }
}

export default Pagination
