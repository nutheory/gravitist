const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const combineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.pug',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  resolve: {
    extensions: [".js", ".jsx", ".es6"]
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
          loader: ['html-loader', 'pug-html-loader?pretty&exports=false']
      },
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }, {
        test: /.*\.(gif|png|jpe?g|svg|mp4)$/i,
        use: "file-loader?name=[hash].[ext]&publicPath=assets/&outputPath=assets/"
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
    // extractHtml
  ]
}
