var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/application.js",

    output: {
        path: "./dist/",
        filename: "bundle.js"
    },

    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.jpg$/, loader: "file-loader" },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
      ]
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
          title: 'Calendar',
          template: './src/index-template.html',
          inject: 'body'
          })
        ]
};
 
