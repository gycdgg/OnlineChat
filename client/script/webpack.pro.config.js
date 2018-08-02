'use strict'
const webpack = require('webpack')
const path = require('path')
const valudes = require('postcss-modules-values')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
          plugins: [ 'transform-decorators-legacy', 'transform-decorators' ]
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=102400'
      }, {
        test: /\.styl$/,
        exclude: path.resolve('./src/styles/'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&camelCase&localIdentName=[hash:base64:16]&importLoaders=1!sty' +
            'lus-loader')
      }, {
        test: /\.styl$/,
        include: path.resolve('./src/styles/'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader?{modifyVars:{"@primary-color":"#e50012"}}')
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
    new HtmlWebpackPlugin({ title: 'this is a test title', inject: 'body', template: 'src/templates/index.html', favicon: 'src/assets/favicon.png' }),
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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
    new webpack
      .optimize
      .OccurenceOrderPlugin(),
    new webpack
      .optimize
      .DedupePlugin()
  ],
  resolve: {
    extensions: [
      '', '.js', '.jsx', '.styl'
    ],
    alias: {
      'imgs': path.resolve(
        __dirname, '../src/assets/img/index'
      ),
      '$fetch': path.resolve(
          __dirname, '../util/fetch.js'
      ),
      'util': path.resolve(
        __dirname, '../util/index.js'
      )
    }
  }
}

module.exports = config