import React, {Component} from 'react'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import ReactDOM from 'react-dom'
import App from './components/layouts/app'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  // opts: {
  //   credentials: 'same-origin'
  // },
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) { req.options.headers = {} }

    const token = localStorage.getItem('hf_auth_header_token')
    console.log("TOKEN", token)
    req.options.headers.authorization = token ? `${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const render = (Component) => {
  ReactDOM.render(<ApolloProvider client={client}><Component /></ApolloProvider>, document.getElementById('root'))
}

render(App)
