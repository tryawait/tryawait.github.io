const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Markdown = require('./markdown')

module.exports = {
  entry: [
    './src/js/index.js',
    './src/css/app.css',
  ],
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new Markdown(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ]
}