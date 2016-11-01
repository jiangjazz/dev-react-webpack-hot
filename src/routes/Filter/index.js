import { injectReducer } from '../../store/reducers'

export default(store) => ({
  path: 'filter',
  getComponent(nextState, cb) {
      const Filter = require('./container/FilterContainer').default
      const reducer = require('./module/filter').default
      injectReducer(store, { key: 'filter', reducer })
      cb(null, Filter)
  }
})
