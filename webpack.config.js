const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: {
    app: './src/index'
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    globalObject: "this",
    libraryTarget: 'umd',
    library: 'ontime-di',
    umdNamedDefine: true
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new CleanWebpackPlugin()
  ]
};
