const path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../'),
        assetsSubDirectory: 'static/dist',
        assetsPublicPath: '/',
    },
    dev: {
        env: require('./dev.env'),
        port: 1234,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
    }
}
