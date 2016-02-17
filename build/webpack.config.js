var webpack = require('webpack');

module.exports = {
  entry: {
    'responsive-navigation': './src/responsive-navigation.js'
  },
  output: {
    path: './dist',
    filename: 'responsive-navigation.js',
    libraryTarget: 'var',
    library: 'responsiveNavigation'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {comments: false},
      compressor: {warnings: false}
    })
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        query: {
          compact: true,
          presets: ['es2015']
        }
      }
    ]
  }
};
