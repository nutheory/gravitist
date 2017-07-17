import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CurrentUserQuery from '../../queries/current_user'
import { graphql } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactResizeDetector from 'react-resize-detector'
import Helpers from '../../styles/helpers'
import { PublicRoutes, AgentRoutes, PilotRoutes, AdminRoutes } from './routes'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Loader from '../views/misc/loader'


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
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }

    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  async getCurrentUser(){
    const cu = await this.props.data
    console.log('currentUser', cu)
  }

  componentDidMount(){
    this.getCurrentUser()
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
    if(this.props.data.loading === true){ return (<Loader />) }
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
            <Switch>
              <Route path="/agent" render={({match}) => (
                this.state.current_user && this.state.current_user.type === "agent"
                ? <AgentRoutes {...this.props} />
                : <Redirect to="/" />
              )} />
              <Route component={PublicRoutes} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

export default graphql(CurrentUserQuery)(App)
