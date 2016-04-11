module.exports = {
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.jpg$/, loader: "file-loader" }
      ]
    },
    entry: "./src/application.js",
    output: {
        path: "./dist/",
        filename: "bundle.js"
    }
};
