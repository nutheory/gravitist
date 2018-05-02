// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql } from 'react-apollo'
const orderStatuses = [['No Filter', ''], [ 'Recruiting','recruiting' ], ['Pending','pending'], ['Filming','filming'],
  ['Uploaded','uploaded'], ['Initial Processing', 'initial_processing'], ['Awaitng Review', 'awaiting_review'],
  ['Final Processing','final_processing'], ['Approved/Completed','approved_completed'], ['Rejected','rejected']]

type Props = {
  pageType?: string,
  queryString?: string,
  placeHolder?: string,
  searchQuery: Function,
}

type State = {
  filterOpen: boolean,
  orderFilterName: string
}

class Search extends Component<Props, State>{

  toggleFilterOpen: Function
  orderStatusSelect: Function

  constructor(props: Object){
    super(props)

    this.state ={
      filterOpen: false,
      orderFilterName: ''
    }

    this.toggleFilterOpen = this.toggleFilterOpen.bind(this)
    this.orderStatusSelect = this.orderStatusSelect.bind(this)
  }

  toggleFilterOpen(){
    this.setState({ filterOpen: !this.state.filterOpen })
  }

  orderStatusSelect(e: SyntheticEvent<*>){
    const status = e.currentTarget.getAttribute('value')
    const title = e.currentTarget.getAttribute('title')
    this.setState({ filterOpen: !this.state.filterOpen, orderFilterName: title }, function(){
      this.props.searchQuery({ currentTarget: { value: status, pageType: this.props.pageType }})
    })
  }

  render(){
    return(
      <div className="flex flex-wrap">
        { this.props.pageType === "order" ?
          <div className="mr-6 w-full md:w-auto mb-2 md:mb-0">
            <div className={`dropdown relative inline-block ${this.state.filterOpen ? 'is-active' : '' }`}>
              <div className="dropdown-trigger hover:cursor-pointer" onClick={ this.toggleFilterOpen }>
                <button
                  className="select-faker"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu">
                  <span>{ this.state.orderFilterName ? this.state.orderFilterName : 'Order status' }</span>
                  <span className="inline-block ml-6">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className={`dropdown-menu ${ this.state.filterOpen ? 'block' : 'hidden' }`} id="dropdown-menu" role="menu">
                <div className="p-2 flex flex-wrap bg-white border border-grey rounded">
                  {  orderStatuses.map((stat, i) => (
                    <a
                      key={`opts_${i}`}
                      pagetype={this.props.pageType}
                      className="w-full block px-2 py-1 hover:cursor-pointer"
                      onClick={ this.orderStatusSelect }
                      value={stat[1]}
                      title={stat[0]}
                    >{stat[0]}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        : null }
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              className="input pl-8"
              type="text"
              name="queryString"
              pagetype={this.props.pageType}
              defaultValue={ this.props.queryString }
              placeholder={ this.props.placeHolder }
              onChange={ this.props.searchQuery } />
            <span className="input-icon pin-l">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
