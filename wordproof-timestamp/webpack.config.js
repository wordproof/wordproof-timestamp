const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'admin': './src/js/admin.js',
    'settings': './src/js/settings.js',
    'frontend': './src/js/frontend.js',
    'wizard': './src/js/wizard.js',
    'getting-started': './src/js/gettingStarted.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets/js')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new MiniCssExtractPlugin({ filename: '../css/[name].css' })
  ]
}
