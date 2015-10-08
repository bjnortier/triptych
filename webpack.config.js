module.exports = {
  entry: {
    'events.test': "./test/functional/src/events.test.js",
    'databinding.test': "./test/functional/src/databinding.test.js",
    'annotations.test': "./test/functional/src/annotations.test.js",
    'renderingorder.test': "./test/functional/src/renderingorder.test.js",
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
  devtool: "#source-map",
  node: {
    net: 'empty',
    dns: 'empty',
  }
};