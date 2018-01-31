// @flow
import React, { Component } from 'react'
import { css } from 'aphrodite'
import { graphql } from 'react-apollo'

const Search = (props: Object) => {
  return(
    <div className="field">
      <div className="control is-expanded has-icons-left">
        <input
          className="input is-medium"
          type="text"
          name="queryString"
          defaultValue={ props.queryString }
          placeholder={ props.placeHolder }
          onChange={ props.searchQuery } />
        <span className="icon is-small is-left">
          <i className="fa fa-search"></i>
        </span>
      </div>
    </div>
  )
}

export default Search
