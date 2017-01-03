const path = require("path");

const sourceFolder = path.resolve(__dirname, "../src");

module.exports = [{
      test: /\.js$/,
      loader: "babel-loader"
    },
    {test: /\.css$/, loader: 'style-loader!css-loader'}
    ];