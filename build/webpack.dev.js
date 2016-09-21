const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.public')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            // include: path.resolve(__dirname, 'app'),
            exclude: /node_modules/,
            loader: 'css-loader!sass-loader?indentedSyntax'
        }]
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin("[name].css",{allChunks: true}),
        new webpack.DefinePlugin({
            // 'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        })
    ]
})