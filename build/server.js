const path = require('path')
const express = require('express')
const webpack = require('webpack')
// const proxyMiddleware = require('http-proxy-middleware')

const webpackConfig = require('./webpack.dev')
const config = require('../config/')

const port = config.dev.port
const proxyTable = config.dev.proxyTable
const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
/*Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  console.log(context, options)
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})*/

// serve webpack bundle output
app.use(devMiddleware)
// enable hot-reload and state-preserving
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
