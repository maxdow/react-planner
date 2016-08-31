module.exports = [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel"
    },
    {test: /\.css$/, loader: 'style!css'}
    ];