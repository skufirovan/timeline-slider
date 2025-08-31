const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugins = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/app/index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "./dist"),
    filename: production
      ? "static/scripts/[name].[contenthash].js"
      : "static/scripts/[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]__[hash:base64:5]",
                auto: /\.module\.\w+$/i,
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                loadPaths: [path.resolve(__dirname, "..", "./src/app/styles")],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
    alias: {
      "@app": path.resolve(__dirname, "..", "./src/app"),
      "@pages": path.resolve(__dirname, "..", "./src/pages"),
      "@shared": path.resolve(__dirname, "..", "./src/shared"),
      "@widgets": path.resolve(__dirname, "..", "./src/widgets"),
    },
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, "..", "public/index.html"),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/styles/index.css",
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
  ],
};
