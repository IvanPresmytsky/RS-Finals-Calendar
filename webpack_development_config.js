const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PORT = require('./port.config.js');
const webpack = require('webpack');

module.exports = require('./webpack_base_config.js')({
  entry: [
    'webpack-dev-server/client?http://localhost:' + PORT,
//    'webpack-hot-middleware/client',
     'webpack/hot/only-dev-server',
     './src/application.js'
  ],

  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      title: 'Calendar',
      template: './src/index-template.html',
      inject: 'body',
    }),
  ],

  jsLoaders: [
    {
      loader: 'react-hot-loader',
    }, {
      loader: 'babel-loader',
    },
  ],

  cssLoaders: ExtractTextPlugin.extract({
    fallbackLoader:'style-loader?fixUrls',
    loader: 'css-loader',
  }),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    port: PORT,
    contentBase: './'
  },

});
