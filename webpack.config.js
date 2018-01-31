const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const DashboardPlugin = require('webpack-dashboard/plugin')
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
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      },
      // {
      //   test: /\.(scss|css)$/,
      //   include: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   use: ["style-loader", "css-loader", "sass-loader"]
        // loader: combineLoaders([
        //   {
        //     loader: 'style-loader'
        //   }, {
        //     loader: 'css-loader'
        //   }, {
        //     loader: "sass-loader"
        //   }
        // ])
      // },
      // {
      //   test: /\.sass$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
      // {
      //   test: /\.scss$/,
      //   use: [{
      //       loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //       loader: "css-loader" // translates CSS into CommonJS
      //   }, {
      //       loader: "sass-loader" // compiles Sass to CSS
      //   }]
      // },
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
    new ExtractTextPlugin("styles.css"),
    new DashboardPlugin(),
    HtmlWebpackPluginConfig
    // extractHtml
  ]

}
