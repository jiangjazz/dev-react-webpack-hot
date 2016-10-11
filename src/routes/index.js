import Home from './Home'
import Uitest from './Uitest'
import PageNotFound from './404'
import Redirect from './404/redirect'

import { injectReducer } from '../store/reducers'

export const createRoutes = (store) => ({
  path: '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CoreLayout = require('../layouts/CoreLayout/container/LayoutContainer').default
      const reducer = require('../layouts/CoreLayout/module/layout').default
      injectReducer(store, { key: 'CoreLayout' , reducer})
      cb(null, CoreLayout)
    })
  },
  indexRoute: Home,
  childRoutes: [
    Uitest(store),
    PageNotFound(),
    Redirect
  ]
})

export default createRoutes
