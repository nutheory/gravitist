const path = require('path');
const webpack = require('webpack');
const spawn = require('child_process').spawn;
const HtmlWebpackPlugin = require('html-webpack-plugin')

const combineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.pug',
  filename: 'index.html',
  inject: 'body'
})

const compiler = webpack({
    entry: './client/index.js',
    output: {
      path: path.resolve('dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: [".js", ".jsx", ".es6"]
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
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

              }
            }
          ])
        }, {
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
      HtmlWebpackPluginConfig
      // extractHtml
    ]

});
const watchConfig = {
    // compiler watch configuration
    // see https://webpack.js.org/configuration/watch/
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
};

let serverControl;

compiler.watch(watchConfig, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        info.errors.forEach(message => console.log(message));
        return;
    }

    if (stats.hasWarnings()) {
        info.warnings.forEach(message => console.log(message));
    }

    if (serverControl) {
        serverControl.kill();
    }

    // change app.js to the relative path to the bundle created by webpack, if necessary
    serverControl = spawn('node', [path.resolve(__dirname, './index.js')]);

    serverControl.stdout.on('data', data => console.log(data.toString()));
    serverControl.stderr.on('data', data => console.error(data.toString()));
});
