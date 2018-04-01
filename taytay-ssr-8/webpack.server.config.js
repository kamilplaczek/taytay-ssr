const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/server/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    })
  ],
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
      { test: /\.css$/, loader: 'ignore-loader' }
    ]
  },
};