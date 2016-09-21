console.log(process.argv)
const _env = process.argv.splice(2)[0] || 'dev'
console.log(_env)
require('shelljs/global')
env.NODE_ENV = 'production'
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod')(_env)
const ora = require('ora')

const config = require('../config/')



console.log(
    '开始编译：\n'+
    '…………—_—!!!'
)

const oraSpinner = ora('构建生产环境前端文件...')
oraSpinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, (err, stats) => {
  oraSpinner.stop()
  if (err) {
    throw err
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
