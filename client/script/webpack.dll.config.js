'use strict'

const path = require('path')
const webpack = require('webpack')

const vendors = [
  'react',
  'react-dom',
  'classnames',
  'react-router',
  'react-router-redux',
  'antd',
  'redux',
  'react-redux',
  'redux-immutable',
  'redux-thunk',
  'immutable',
  'whatwg-fetch',
  'isomorphic-fetch',
  'emoji-mart'
]

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[id].dll.js',
    library: '[name]'
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }]
  }
  ,
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', 'dist', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '..')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false
      }),
    new webpack
      .optimize
      .OccurenceOrderPlugin()
  ]
}
