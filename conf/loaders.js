module.exports = [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {test: /\.css$/, loader: 'style-loader!css-loader'}
    ];