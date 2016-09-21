const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('../config')
console.log(process.env.NODE_ENV)

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        fallback: [path.join(__dirname, '../node_modules')]
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets:['react','es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader!css-loader')
            },
            {
                test: /\.scss$/,
                // include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract( 'css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'sass-loader?sourceMap')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 6000,
                    name: path.posix.join(config.build.assetsSubDirectory, 'img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 6000,
                    name: path.posix.join(config.build.assetsSubDirectory,'fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
