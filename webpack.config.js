const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const DashboardPlugin = require('webpack-dashboard/plugin')
const combineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/views/index.pug',
  filename: 'index.html',
  inject: 'body'
})

const appCss = new ExtractTextPlugin("styles.css")
const galleryCss = new ExtractTextPlugin("gallery.css")

module.exports = {
  entry: './client/views/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
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
        test: /(gallery\.s?css$)/,
        use: galleryCss.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      },
      {
        test: /\.(css|sass|scss)$/,
        use: appCss.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
        exclude: /gallery/
      },
      {
        test: /.*\.(gif|png|jpe?g|svg|mp4|m4v|)$/i,
        use: "file-loader?name=[hash].[ext]&publicPath=assets/&outputPath=assets/"
      }, {
        test: /.*\.(eot|ttf|woff|woff2|)$/i,
        loader: "file-loader?name=[hash].[ext]&publicPath=/assets/fonts/&outputPath=assets/fonts/"
      }

    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    appCss,
    galleryCss,
    new DashboardPlugin(),
    HtmlWebpackPluginConfig
    // extractHtml
  ]

}
