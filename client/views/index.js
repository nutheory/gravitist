// show tory
//@flow
import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { merge } from 'ramda'
import { ApolloProvider } from 'react-apollo'
import { render } from 'react-dom'
import '../styles/loader.css'
import '../../node_modules/video-react/dist/video-react.css'
import '../styles/main.css'
import App from '../components/layouts/app'

const requestLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('hf_auth_header_token') || null
  if(token){
    operation.setContext({
      headers: {
        authorization: `${token}`
      }
    })
  }
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

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"))

// client.resetStore()
const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(WrappedApp, document.getElementById('root'))
