import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './components/layouts/App'

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}

render(App)
