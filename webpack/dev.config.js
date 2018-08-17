const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'app/src'],
  },
  context: path.join(__dirname, '../app'),
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
  },
  externals: {
    electron: "require('electron')",
    child_process: "require('child_process')",
    fs: "require('fs')",
    path: "require('path')",
    'electron-remote': "require('electron-remote')",
    leveldown: "require('leveldown')",
  },
  target: 'electron-renderer',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/main/js/index.js',
      './src/main/res/scss/main.scss',
    ],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './app/build'),
    filename: 'app.bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    hot: true,
    publicPath: 'http://localhost:8080/',
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader?name=/fonts/[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules(?!(\/|\\)w3gjs)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react'],
          },

        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {},
        }],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: './src/main/app.js',
    },
    {
      from: './src/main/index.html',
    },
    ]),
  ],
};
