import React from 'react'
import ReactDOM from 'react-dom'

import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

import './scss/style.scss'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const MOUNT_NODE = document.querySelector("#app")

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

render()
