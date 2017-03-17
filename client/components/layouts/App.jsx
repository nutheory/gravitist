import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppHeader from './Header'
import Routes from '../../routes'


class App extends Component {

  constructor(){
    super()
    injectTapEventPlugin()
    this.state = {
      user:  {}
    }
  }

  render(){
    return (
      <Router>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <AppHeader />
            <Routes />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }

}

export default App
