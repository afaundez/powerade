const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js',
    example: './src/example.js'
  },
  output: {
    library: 'Powerade'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Powerade',
      filename: 'example.html',
      template: 'src/example.html'
    })
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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
