import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndexPage from '../views/index/index'
import PilotPage from '../views/pilots/index'
import Pricing from '../views/agent/pricingList'
import Order from '../views/agent/order'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Colors from '../../styles/colors'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import AppHeader from './Header'
import AppFooter from './Footer'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.blue,
  }
})

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
  networkInterface,
  dataIdFromObject: o => o.id
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
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <AppHeader />
              <Route exact path='/' component={IndexPage} />
              <Route path='/pilots' component={PilotPage} />

              <AppFooter />
            </div>
          </MuiThemeProvider>
        </Router>
      </ApolloProvider>
    )
  }

}
export default App
