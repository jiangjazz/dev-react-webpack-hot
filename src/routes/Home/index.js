import { injectReducer } from '../../store/reducers'

export default(store) => ({
  getComponent(nextState, cb) {
      const Home = require('./container/HomeContainer').default
      const reducer = require('./module/home').default
      injectReducer(store, { key: 'HomeList', reducer })
      cb(null, Home)
  }
})
