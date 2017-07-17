import React, {Component} from 'react'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import ReactDOM from 'react-dom'
import App from './components/layouts/app'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const render = (Component) => {
  ReactDOM.render(<ApolloProvider client={client}><Component /></ApolloProvider>, document.getElementById('root'))
}

render(App)
