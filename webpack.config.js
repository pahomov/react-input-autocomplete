var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
  cache: true,
  debug: true,
  entry: './src/script/index.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    filename: 'index.js',
    sourceMapFilename: '[file].map',
    publicPath: 'http://localhost:33301/assets'
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
      exclude: /(node_modules)/
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(svg|gif|png)$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new NpmInstallPlugin({
      save: true
    })
  ]
};
