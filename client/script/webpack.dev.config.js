'use strict'

const config = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const port = 9091
config.cache = true
config.devtool = 'inline-eval-source-map'
config.plugins.push(
  new OpenBrowserPlugin({ url: 'http://localhost:' + port })
)
config.devServer = {
  port: port,
  proxy: {
    // 'http://localhost:4000/': {    target: 'http://localhost:8888',    secure:
    // false    // rewrite: function (req) {        // req.url =
    // req.url.replace(/^\/api/, '')    // } }
  }
}

module.exports = config
