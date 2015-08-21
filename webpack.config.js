module.exports = {
  entry: {
    'events.test': "./test/functional/src/events.test.js"
  },
  output: {
    path: 'test/functional/lib/',
    filename: "[name].bundle.js"
  },
  devtool: "#source-map"
};