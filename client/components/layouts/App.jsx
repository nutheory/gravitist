import '../../styles/globalOverrides.css'
import 'normalize.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndexPage from '../views/index/index'
import PilotPage from '../views/pilots/index'
import PilotSignupPage from '../views/pilots/signup'
import WorkPage from '../views/works/index'
import FaqPage from '../views/misc/faqIndex'
import PricingPage from '../views/agent/pricing'
import SampleVideo from '../views/misc/sampleVideo'
import Order from '../views/agent/order'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactResizeDetector from 'react-resize-detector'
import Helpers from '../../styles/helpers'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import AppHeader from './Header'
import AppFooter from './Footer'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Helpers.colors.blue,
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
      user: {},
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
  }

  onResize(){
    let width = window.innerWidth
    let height = window.innerHeight
    this.setState({ windowWidth: width, windowHeight: height }, (res) => {
      console.log('window resized!')
    })
  }

  render(){
    
    return (
      <ApolloProvider client={client}>
        <Router>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
              <AppHeader />
              <Route exact path='/' component={IndexPage} />
              <Route exact path='/pilots' component={PilotPage} />
              <Route path='/pilots/signup' component={PilotSignupPage} />
              <Route path='/pricing' component={PricingPage} />
              <Route path='/how-it-works' component={WorkPage} />
              <Route path='/sample-video' component={SampleVideo} />
              <Route path='/faq' component={FaqPage} />
              <AppFooter />
            </div>
          </MuiThemeProvider>
        </Router>
      </ApolloProvider>
    )
  }

}
export default App
