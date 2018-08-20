'use strict'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const valudes = require('postcss-modules-values')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: [
    'babel-polyfill', './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react', 'stage-1' ],
          plugins: [ 'transform-decorators-legacy', 'transform-decorators', [ 'import', {
            libraryName: 'antd',
            style: 'css'
          }]]
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=1024000'
      }, {
        test: /\.styl$/,
        exclude: path.resolve('./src/styles/'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&camelCase&localIdentName=[path][name]___[local]_[hash:base64:' +
            '5]&importLoaders=1!stylus-loader')
      }, {
        test: /\.styl$/,
        include: path.resolve('./src/styles/'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]
  },
  stylus: {
    use: [ poststylus([ 'autoprefixer' ]) ],
    import: [ path.resolve('./src/styles/variables.styl') ]
  },
  postcss: [
    valudes,
    autoprefixer({
      browsers: [ '> 5%', 'last 2 versions', 'Firefox ESR' ]
    })
  ],
  plugins: [
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new HtmlWebpackPlugin({ title: 'test title', inject: 'body', template: 'src/templates/test.html', favicon: 'src/assets/favicon.png' }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('../dist/vendor-manifest.json')
    }),
    new webpack
      .optimize
      .CommonsChunkPlugin('vendors.[hash].js'),
    new ExtractTextPlugin('styles.[hash].css', { allChunk: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  resolve: {
    extensions: [
      '', '.js', '.jsx', '.styl'
    ],
    alias: {
      '$fetch': path.resolve(__dirname, '../util/fetch.js')
    }
  }
}

module.exports = config
