module.exports = {
  output: {
    library: 'Powerade'
  },
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
