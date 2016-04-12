var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.jpg$/, loader: "file-loader" },
        {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
      ]
    },
   plugins: [
        new ExtractTextPlugin('bundle.css')
        ],
    entry: "./src/application.js",
    output: {
        path: "./dist/",
        filename: "bundle.js"
    }
};
