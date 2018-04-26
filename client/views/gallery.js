import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { render } from 'react-dom'
import '../../node_modules/video-react/dist/video-react.css'
import '../styles/gallery.css'
import Gallery from '../components/layouts/gallery'

const requestLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})

const middlewareLink = new ApolloLink((operation, forward) => {
  return forward(operation)
})

const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
  if (graphQLErrors) { console.log('ErrorDialog', graphQLErrors) }
  if (networkError) { console.log('NetErrorDialog', networkError) }
})

const cache = new InMemoryCache()

const link = ApolloLink.from([middlewareLink, errorLink, requestLink])

const client = new ApolloClient({
  link,
  cache,
})

const WrappedGallery = (
  <ApolloProvider client={client}>
    <Gallery />
  </ApolloProvider>
)

render(WrappedGallery, document.getElementById('root'))
