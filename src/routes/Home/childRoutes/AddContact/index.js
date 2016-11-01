import { injectReducer } from 'RouteReducer'

export default(store) => ({
  path: 'contact/create/manual',
  getComponent(nextState, cb) {
      const AddContact = require('./container/AddContactContainer').default
      const reducer = require('./module/AddContact').default
      injectReducer(store, { key: 'AddContact', reducer })
      cb(null, AddContact)
  }
})
