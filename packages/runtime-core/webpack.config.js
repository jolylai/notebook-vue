const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rective.bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: './'
  }
}
