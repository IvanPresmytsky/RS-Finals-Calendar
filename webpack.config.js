module.exports = {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ],
    entry: "./src/application.js",
    output: {
        path: "./dist/",
        filename: "bundle.js"
    }
};