import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CurrentUserQuery from '../../queries/current_user'
import { graphql } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactResizeDetector from 'react-resize-detector'
import Helpers from '../../styles/helpers'
import { Routes } from './routes'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Loader from '../misc/loader'


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Helpers.c.blue,
    accent1Color: Helpers.c.teal,
  }
})

class App extends Component {
  constructor(){
    super()
    injectTapEventPlugin()
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }

    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  getCurrentUser(){

    const user  = this.props.data
    // setTimeout(() => {
      console.log('getCurrentUser', user)
    // }, 10000)
  }

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
    const { loading }  = this.props.data
    if(loading === true){ return (<Loader />) }
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
            <Routes {...this.props.data} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

export default graphql(CurrentUserQuery)(App)
