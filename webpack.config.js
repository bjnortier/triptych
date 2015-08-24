module.exports = {
  entry: {
    'events.test': "./test/functional/src/events.test.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ],
  },
  output: {
    path: 'test/functional/lib/',
    filename: "[name].bundle.js"
  },
  devtool: "#source-map"
};