// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql } from 'react-apollo'

const Search = (props: Object) => {
  return(
    <div className="">
      <div className="relative">
        <input
          className="input pl-8"
          type="text"
          name="queryString"
          defaultValue={ props.queryString }
          placeholder={ props.placeHolder }
          onChange={ props.searchQuery } />
        <span className="input-icon pin-l">
          <i className="fa fa-search"></i>
        </span>
      </div>
    </div>
  )
}

export default Search
