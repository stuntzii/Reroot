const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  node: {
    __filename: false,
    __dirname: false,
  },
  entry: {
    inject: "./src/inject/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build/"),
  },
  resolve: {
    fallback: {
      util: require.resolve(`util/`),
      url: require.resolve(`url/`),
      assert: require.resolve(`assert/`),
      crypto: require.resolve(`crypto-browserify`),
      os: require.resolve(`os-browserify/browser`),
      https: require.resolve(`https-browserify`),
      http: require.resolve(`stream-http`),
      stream: require.resolve(`stream-browserify`),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "common/manifest.json",
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
          to: "[name][ext]",
        },
        {
          from: "common/assets/*",
          to: "assets/[name][ext]",
        },
      ],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
