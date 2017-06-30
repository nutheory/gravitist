import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import queryCurrentUser from '../../queries/currentUser'
import { graphql } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactResizeDetector from 'react-resize-detector'
import Helpers from '../../styles/helpers'
import { PublicRoutes, AgentRoutes, PilotRoutes, AdminRoutes } from './routes'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PublicHeader from './headers/publicHeader'
import AgentHeader from './headers/agentHeader'
import PublicFooter from './footers/publicFooter'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Helpers.colors.blue,
  }
})

class App extends Component {
  constructor(){
    super()
    injectTapEventPlugin()
    this.state = {
      currentUser: "",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
  }

  header(){
    const { loading, user } = this.props.data
    if(localStorage.getItem('hf_auth_header_token')){
      if(loading){ console.log('loading') }
      if(user){
        switch(user.type){
          case "agent": return <AgentHeader {...this.props} />; break;
          case "pilot": return <PublicHeader {...this.props} />; break;
          case "admin": return <PublicHeader {...this.props} />; break;
        }
      }
    }
    return <PublicHeader {...this.props} />
  }

  userRoutes(){
    const { loading, user } = this.props.data
    if(localStorage.getItem('hf_auth_header_token')){
      if(loading){ console.log('loading') }
      if(user){
        switch(user.type){
          case "agent": return <AgentRoutes {...this.props} />; break;
          case "pilot": return <PublicRoutes {...this.props} />; break;
          case "admin": return <PublicRoutes {...this.props} />; break;
        }
      }
    }
  }

  footer(){
    const { loading, user } = this.props.data
    if(localStorage.getItem('hf_auth_header_token')){
      if(loading){ console.log('loading') }
      if(user){
        switch(user.type){
          case "agent": return <PublicFooter {...this.props} />; break;
          case "pilot": return <PublicFooter {...this.props} />; break;
          case "admin": return <PublicFooter {...this.props} />; break;
        }
      }
    }
    return <PublicFooter {...this.props} />
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

  render(){
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
            {this.header()}
            {this.userRoutes()}
            {this.footer()}
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}
export default graphql(queryCurrentUser)(App)
