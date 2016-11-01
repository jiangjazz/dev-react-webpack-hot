import { injectReducer } from '../../store/reducers'

export default(store) => ({
  path: 'fields',
  getComponent(nextState, cb) {
      const Fields = require('./container/FieldsContainer').default
      const reducer = require('./module/fields').default
      injectReducer(store, { key: 'fields', reducer })
      cb(null, Fields)
  }
})
