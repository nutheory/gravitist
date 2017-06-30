import React, {Component} from 'react'
import { ApolloClient, ApolloProvider, createNetworkInterface, graphql } from 'react-apollo'
import ReactDOM from 'react-dom'
import App from './components/layouts/App'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) { req.options.headers = {} }

    const token = localStorage.getItem('hf_auth_header_token')
    if (token) { req.options.headers.authorization = `Bearer ${token}` }
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
