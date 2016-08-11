var webpackConfig = require('./webpack.config.dev.js')

module.exports = function(config) {
  config.set({
    files: [
      { pattern: "test/**/*.js" }
    ],

    frameworks: ['jasmine'],

    preprocessors: {
      "test/**/*.js": ["webpack"]
    },

    webpack: webpackConfig
  });
};