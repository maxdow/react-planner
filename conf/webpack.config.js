const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const loaders = require("./loaders.js");

const sourceFolder = path.resolve(__dirname, "../src");
const outputFolder = path.resolve(__dirname, "../");
const templateIndex = path.resolve(__dirname, "../src/index.html");


module.exports = {
  devtool: "eval",
  entry: [
    sourceFolder
  ],
  output: {
    path: outputFolder,
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject : true,
      template : templateIndex
    })
  ],
  module: {loaders}
};