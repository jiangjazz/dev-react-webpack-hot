import { injectReducer } from 'RouteReducer'

export default(store) => ({
  path: 'contact/create/fieldsMatching',
  getComponent(nextState, cb) {
      const FieldsMatching = require('./container/FieldsMatchingContainer').default
      const reducer = require('./module/FieldsMatching').default
      injectReducer(store, { key: 'FieldsMatching', reducer })
      cb(null, FieldsMatching)
  }
})
