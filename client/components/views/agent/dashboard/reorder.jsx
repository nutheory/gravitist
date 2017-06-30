import React, { Component } from 'react'

class Reorder extends Component{
  constructor(){
    super()
  }

  render(){
    return (
      <div className="tile is-ancestor">
        <div className="tile is-4 is-parent">
          <div className="tile is-child box hero is-warning is-bold">
            <h1 className="title is-3">Basic</h1>
            <h3 className="subtitle is-5">149.00</h3>
            <p>ruyfuffj ufyiuyfuy fuy ufy uyf</p>
          </div>
        </div>
        <div className="tile is-4 is-parent">
          <div className="tile is-child box hero is-danger is-bold">
            <h1 className="title is-3">Standard</h1>
            <h3 className="subtitle is-5">249.00</h3>
            <p>hjf ufu ygigig iuuiuiy  k gkgk</p>
          </div>
        </div>
        <div className="tile is-4 is-parent">
          <div className="tile is-child box hero is-success is-bold">
            <h1 className="title is-3">Platinum</h1>
            <h3 className="subtitle is-5">499.00</h3>
            <p>yftuyiuiuy iuy iuyiuy iuyiuyi </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Reorder
