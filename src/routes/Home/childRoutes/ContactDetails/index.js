import { injectReducer } from 'RouteReducer'

export default(store) => ({
  path: 'contact/:list_id/details/:user_id',
  getComponent(nextState, cb) {
      const ContactDetails = require('./container/ContactDetailsContainer').default
      const reducer = require('./module/ContactDetails').default
      injectReducer(store, { key: 'ContactDetails', reducer })
      cb(null, ContactDetails)
  }
})
