export default(store) => ({
  path: 'details',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./components/view')
      cb(null, View)
    })
  }
})
