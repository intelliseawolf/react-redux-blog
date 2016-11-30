var webpack = require('webpack');


module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
};