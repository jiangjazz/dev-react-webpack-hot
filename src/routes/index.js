import Home from './Home'
import Uitest from './Uitest'
import Filter from './Filter'
import Fields from './Fields'
import PageNotFound from './404'
import Redirect from './404/redirect'

import ContactList from './Home/childRoutes/ContactList'
import FieldsMatching from './Home/childRoutes/FieldsMatching'
import ContactDetails from './Home/childRoutes/ContactDetails'
import AddContact from './Home/childRoutes/AddContact'

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
  indexRoute: Home(store),
  childRoutes: [
    Uitest(store),
    Filter(store),
    Fields(store),

    ContactList(store),
    FieldsMatching(store),
    ContactDetails(store),
    AddContact(store),

    PageNotFound(),
    Redirect
  ]
})

export default createRoutes
