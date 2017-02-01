const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';

module.exports = (options) => ({
  entry: options.entry,
  output: options.output,

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
  },

  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      NODE_ENV: env,
      DEV: env === 'development',
    }),
  ]),

  module: {
    rules: [
      {
        test: /\.js$/,
        use: options.jsLoaders,
        exclude: /node_modules/,
      }, {
        test: /\.jpg$/,
        loader: "file-loader",
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: options.cssLoaders,
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader?fixUrls',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],

    noParse: /\.min\.js/,
  },

  devtool: options.devtool,

  devServer: options.devServer || null,

});
