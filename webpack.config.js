const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      "./src/application.js"
      ],

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] },
        { test: /\.jpg$/, loader: "file-loader" },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
      ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
          title: 'Calendar',
          template: './src/index-template.html',
          inject: 'body'
          })
        ],

    devServer: {
      hot: true,
      contentBase: "./"
    },

    devtool: 'source-map'
};
 
