var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");
let webpack = require("webpack");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "react", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
            // query: {
            //   modules: true,
            //   localIdentName: '[name]__[local]___[hash:base64:5]'
            // }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "'production'"
    })
  ]
};
