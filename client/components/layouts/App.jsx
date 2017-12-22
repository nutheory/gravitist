import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CurrentUserQuery from '../../queries/current_user'
import { graphql } from 'react-apollo'
import ReactResizeDetector from 'react-resize-detector'
import Helpers from '../../styles/helpers'
import Routes from './routes'



class App extends Component {
  constructor(){
    super()
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }

    // this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  // getCurrentUser(){
  //   const user  = this.props.data
  // }

  componentDidMount(){

  }

  onResize(){
    let width = window.innerWidth
    let height = window.innerHeight
    if(width > this.state.windowWidth+40 || width < this.state.windowWidth-40){
      this.setState({ windowWidth: width, windowHeight: height }, (res) => {
        console.log('window resized!')
      })
    }
  }

  // renderRelevantRoutes(current_user){
  //   if(current_user){
  //     if(current_user.type === "agent"){ return <AgentRoutes {...this.props} />}
  //     if(current_user.type === "pilot"){ return <PilotRoutes {...this.props} />}
  //     if(current_user.type === "editor"){ return <EditorRoutes {...this.props} />}
  //     if(current_user.type === "admin"){ return <AdminRoutes {...this.props} />}
  //   }
  //   return <PublicRoutes user />
  // }
  // AuthRoutes(){
  //   const { loading, current_user }  = this.props.data
  //   console.log('current_user', this.props.data)
  //   if(loading === true){ return (<Loader />) }
  //   return <Routes current_user={current_user} />
  // }

  render(){
    // const { loading }  = this.props.data
    // if(loading === true){ return (<Loader />) }
    return (
      <BrowserRouter>
        <div>
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
          <Routes />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
