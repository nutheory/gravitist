import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { render } from 'react-dom'
import 'bulma/css/bulma.css'
import './styles/loader.css'
// import '/uppy/uppy.min.css'
import App from './components/layouts/app'

const requestLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})


const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('hf_auth_header_token') || null
  if (token){
    operation.setContext({
      headers: {
        authorization: `${token}`,
      }
    });
  }
  return forward(operation)
})

const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.log('setErrorDialog', message)
      console.log('setErrorDialog2',response)
    })
  }
  if (networkError) {
    console.log('setErrorDialog', 'Sorry, our server is off-line. Please try again later.')
  }
})

const cache = new InMemoryCache({
  dataIdFromObject: (o) => o.id
})

const link = ApolloLink.from([middlewareLink, errorLink, requestLink])

// middleware.concat(httpLink)

const client = new ApolloClient({
  link,
  cache,
})

const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(WrappedApp, document.getElementById('root'))
