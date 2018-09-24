const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  {
    name: 'npm',
    mode: 'production',
    entry: {
      main: './src/main.js'
    },
    output: {
      library: 'Powerade'
    },
    plugins: [
      new CleanWebpackPlugin(['dist'])
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/, /_site/],
          loader: 'babel-loader'
        }
      ]
    }
  },
  {
    name: 'dev',
    mode: 'development',
    entry: {
      main: './src/main.js',
      example: './test/fixtures/scripts/example.js'
    },
    output: {
      library: 'Powerade'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Powerade',
        filename: 'example.html',
        template: './test/fixtures/example.html'
      })
    ],
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  }
]
