module.exports = (function () {
  const libraryName = 'createIt';

  return {
    entry: "./src/index.js",

    devtool: 'inline-source-map',

    output: {
      path: __dirname + "/build",
      library: libraryName,
      libraryTarget: 'umd',
      filename: libraryName + '.js'
    },

    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: 'node_modules', loader: 'babel' }
      ]
    }
  };
})();