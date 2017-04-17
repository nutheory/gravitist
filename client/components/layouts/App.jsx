import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndexMain from '../index/main'
import injectTapEventPlugin from 'react-tap-event-plugin'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import AppHeader from './Header'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) { req.options.headers = {} }

    const token = localStorage.getItem('hf_auth_header_token')
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface
})

class App extends Component {

  constructor(){
    super()
    injectTapEventPlugin()
    this.state = {
      user: {}
    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <ApolloProvider client={client}>
        <Router>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
              <AppHeader />
              <Route path='/' component={IndexMain} />
            </div>
          </MuiThemeProvider>
        </Router>
      </ApolloProvider>
    )
  }

}
export default App
