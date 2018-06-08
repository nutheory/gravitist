const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tailwindcss = require('tailwindcss')
const devMode = process.env.NODE_ENV !== 'production'

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
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                tailwindcss('./client/styles/tailwind.js'),
                postcssPresetEnv({ stage: 0 })
                // require('autoprefixer')
              ]
            } }
          ]
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
      historyApiFallback: true,
      host: 'localhost',
      port: 5005,
      contentBase: path.join(__dirname, "/dist"),
      publicPath: '/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
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
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({ stage: 0 }),
                tailwindcss('./client/styles/tailwind.js'),
                require('autoprefixer')
              ]
            } }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  }
]
