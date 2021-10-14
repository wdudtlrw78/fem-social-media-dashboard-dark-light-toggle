const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const BASE_JS = './app/js/';
const BASE_SCSS = './app/scss/';

const config = {
  name: 'Molymath',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',

  entry: {
    script: BASE_JS + 'script.js',
    style: BASE_SCSS + 'style.scss',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: 'defaults' }]],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },

      {
        test: /\.s[ac]ss?$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],

  devServer: {
    port: 3333,
    hot: true,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true,
  },
};

module.exports = config;
