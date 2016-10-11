const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = require('../config')
const publicWebpackConfig = require('./webpack.public')

module.exports = function (_env) {
    var _ENV
    var _envs = JSON.stringify(_env)
    console.log(JSON.stringify(_env))
    if (_envs == '"master"') {
        _ENV = '"master"'
    }else if (_envs == '"beta"') {
        _ENV = '"beta"'
    }else{
        _ENV = '"development"'
    }
    console.log(_ENV)
    return merge(publicWebpackConfig, {
        output: {
            path: config.build.assetsRoot,
            filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name].[chunkhash].js'),
            chunkFilename: path.posix.join(config.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
        },
        plugins: [
            new webpack.DefinePlugin({
                '_ENV': _ENV
            }),
            new ExtractTextPlugin(path.posix.join(config.build.assetsSubDirectory, 'css/[name].[chunkhash].css')), //单独使用style标签加载css并设置其路径
            new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
                // favicon: './src/img/favicon.ico', //favicon路径
                filename: 'index.html', //生成的html存放路径，相对于 path
                template: './src/index.html', //html模板路径
                inject: true, //允许插件修改哪些内容，包括head与body
                hash: true, //为静态资源生成hash值
                minify: { //压缩HTML文件
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: true //删除空白符与换行符
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              }
            })
        ]
    })
}
