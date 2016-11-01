const path = require('path')

module.exports = {
    build: {
        assetsRoot: path.resolve(__dirname, '../'),
        assetsSubDirectory: 'static/dist',
        assetsPublicPath: '/',
    },
    dev: {
        port: 1234,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
    }
}
