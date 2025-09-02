const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: path.resolve(__dirname, "..", "./dist"),
    historyApiFallback: true,
    port: 8080,
    hot: true,
  },
};
