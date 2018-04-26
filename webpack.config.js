const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const DashboardPlugin = require('webpack-dashboard/plugin')
const combineLoaders = require('webpack-combine-loaders')
const tailwindcss = require('tailwindcss')

const appCss = new ExtractTextPlugin("styles.css")
const galleryCss = new ExtractTextPlugin("gallery.css")

module.exports = [
  {
    entry: {
      index: './client/views/index.js',
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name]_bundle.js',
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
          test: /\.(css)$/,
          use: appCss.extract({ fallback: 'style-loader', use: [ { loader: 'css-loader',
          options: { importLoaders: 1} }, { loader: 'postcss-loader'}]})
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
      require('autoprefixer')
    ]
  },
  {
    entry: {
      gallery: './client/views/gallery.js',
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name]_bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: [".js", ".jsx", ".es6"]
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(css)$/,
          use: galleryCss.extract({ fallback: 'style-loader', use: [ { loader: 'css-loader',
          options: { importLoaders: 1} }, { loader: 'postcss-loader'}]})
        }
      ]
    },
    plugins: [
      galleryCss,
      require('autoprefixer')
    ]
  }
]
