const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const Dotenv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  node: {
    __filename: false,
    __dirname: false,
  },
  entry: {
    inject: "./src/inject/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "common/manifest.json",
          transform(content, path) {
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
    new Dotenv({
      path: "./.env",
    }),
    new FilterWarningsPlugin({
      exclude: /Failed\sto\sparse\ssource\smap/,
    }),
    // Uncomment to see package sizes
    // new BundleAnalyzerPlugin(),
  ],
};
