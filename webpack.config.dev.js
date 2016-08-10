module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/build",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: 'node_modules', loader: 'babel' }
    ]
  }
};