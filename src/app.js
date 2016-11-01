$.ajaxSetup({
  headers: {token: '4c3e8605fb1f404986d2b4a1c67805f5'}
})

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
console.log('%c目前的环境是'+_ENV, 'background: black;color: white;')
render()
