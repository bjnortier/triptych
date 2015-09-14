module.exports = {
  entry: {
    'events.test': "./test/functional/src/events.test.js",
    'databinding.test': "./test/functional/src/databinding.test.js",
    'validation.test': "./test/functional/src/validation.test.js",
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