const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  devtool: 'source-map',
  entry: {
    app: [
      './src/main/js/index.js',
      './src/main/res/scss/main.scss',
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'app/src'],
  },
  target: 'electron-main',
  externals: {
    electron: "require('electron')",
    child_process: "require('child_process')",
    fs: "require('fs')",
    path: "require('path')",
    zlib: "require('zlib')",
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../app/build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules(?!(\/|\\)w3gjs)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react', 'env'],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('css/main.css'),
    new CopyWebpackPlugin([
      {
        from: './src/main/app.js',
        to: path.join(__dirname, '../app/build'),
      },
      {
        from: './src/main/index.html',
        to: path.join(__dirname, '../app/build'),
      },
    ]),
  ],
};
