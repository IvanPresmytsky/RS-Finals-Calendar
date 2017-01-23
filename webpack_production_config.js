const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack_base_config.js')({
  entry: [
     "./src/application.js"
  ],

  output: {
    path: path.join(__dirname, "docs"),
    filename: "bundle.js",
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      title: 'Calendar',
      template: './src/index-template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: 'body',
    }),
  ],

  cssLoaders: ExtractTextPlugin.extract({
    fallbackLoader:'style-loader?fixUrls',
    loader: 'css-loader?modules&-autoprefixer&importLoaders=1',
  }),
});
