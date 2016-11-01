import { injectReducer } from 'RouteReducer'

export default(store) => ({
  path: 'contact/lists/:listId',
  getComponent(nextState, cb) {
      const Contact = require('./container/ContactListContainer').default
      const reducer = require('./module/contactList').default
      injectReducer(store, { key: 'ContactList', reducer })
      cb(null, Contact)
  }
})
