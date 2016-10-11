export default () => ({
  path: '404',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PageNotFind = require('./components/404').default
      cb(null, PageNotFind)
    })
  }
})
