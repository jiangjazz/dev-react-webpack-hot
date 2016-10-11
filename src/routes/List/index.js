import { injectReducer } from '../../store/reducers'

export default(store) => ({
  path: 'list',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ListView = require('./container/ListContainer').default
      const reducer = require('./module/list').default
      injectReducer(store, { key: 'list' , reducer})
      cb(null, ListView)
    })
  }
})
