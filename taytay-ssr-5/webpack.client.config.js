const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015', 'react', 'stage-2'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  devServer: {
    contentBase: './src/client/public'
  },
  plugins: [new ExtractTextPlugin({
    filename: 'styles.css'
  })]
};