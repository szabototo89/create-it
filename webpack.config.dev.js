module.exports = {
  entry: "./src/index.js",

  devtool: 'inline-source-map',

  output: {
    path: __dirname + "/build",
    filename: "create-it.js"
  },
  
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: 'node_modules', loader: 'babel' }
    ]
  }
};