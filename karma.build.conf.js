var webpackConfig = require('./webpack.config.dev.js')

module.exports = function (config) {
  config.set({
    browsers: ["PhantomJS"],

    singleRun: true,

    files: [
      { pattern: "test/**/*.js" }
    ],

    frameworks: ["jasmine"],

    preprocessors: {
      "test/**/*.js": ["babel","webpack"]
    },

    webpack: Object.assign({}, webpackConfig, {
      entry: null
    }),

    babel: {
      options: {
        presets: ['es2015'],
        plugins: ["transform-object-rest-spread"],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath;
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    }
  });
};