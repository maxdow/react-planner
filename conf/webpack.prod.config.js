const path = require("path");
const webpack = require("webpack")
const loaders = require("./loaders.js");

const sourceFolder = path.resolve(__dirname, "../src/component");
const outputFolder = path.resolve(__dirname, "../dist");

var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: sourceFolder,
  output: {
    path: outputFolder,
    filename: "index.js",
    libraryTarget: "umd",
    library: "ReactPlanner"
  },
  externals: nodeModules,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        screw_ie8: true,
        //drop_console: true,
        drop_debugger: true,
        dead_code: true,
        global_defs: {
            __REACT_HOT_LOADER__: undefined
        }
      }
    }),
    new webpack.DefinePlugin({
      env : {NODE_ENV: JSON.stringify("production")},
    })
  ],
  module: {loaders}
};