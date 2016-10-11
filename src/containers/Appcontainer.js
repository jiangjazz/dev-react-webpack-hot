import React, { Component, PropTypes } from 'react'
import { browserHistory, hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  sholdComponentUpdate() {
    return false
  }

  render() {
    const {routes, store} = this.props
    return (
      <Provider store={store}>
        <Router history={hashHistory} children={routes} />
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppContainer
