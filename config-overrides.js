const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const CopyPlugin = require("copy-webpack-plugin");
var path = require("path");
const { dependencies } = require("./package.json");
const webpack = require("webpack");

module.exports = function (config, env) {
  const isProduction = process.env.NODE_ENV || "development";

  config.mode = process.env.NODE_ENV || "development";
  config.output = {
    filename: "bundle.js",
  };
  config.resolve = {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    fallback: {
      https: false,
      stream: false,
    },
  };

  config.module.rules = [
    {
      test: /\.json$/,
      loader: "json-loader",
      type: "javascript/auto",
    },
    {
      test: /\.m?js/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(css|s[ac]ss)$/i,
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
    {
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i, // (1)
      type: "asset/resource",
    },
  ];
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env), // This can be an empty object or any configuration you need
    }),
    new ModuleFederationPlugin(
      (module.exports = {
        name: "host",
        filename: "remoteEntry.js",
        exposes: {
          // group: "./src/pages/groups/index",
        },
        remotes: {
          // GroupRemotMFE:
          //   isProduction === "production"
          //     ? process.env.GROUP_MFE
          //     : "GroupRemotMFE@http://localhost:3001/remoteEntry.js",
          ContactRemotMFE:
            "ContactRemotMFE@https://contact-dev.scholarpresent.com/remoteEntry.js",
          // MessageRemotMFE:
          //   isProduction === "production"
          //     ? process.env.MESSAGE_HOST
          //     : "MessageRemotMFE@http://localhost:3003/remoteEntry.js",
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
          "scholarpresent-integration": {
            singleton: true,
            requiredVersion: dependencies["scholarpresent-integration"],
          },
          "aws-amplify": {
            singleton: true,
            requiredVersion: dependencies["aws-amplify"],
          },
        },
      })
    ),
    // new HtmlWebPackPlugin({
    //   template: "./public/index.html",
    //   filename: "index.html",
    // }),
    new CopyPlugin({
      patterns: [{ from: "src/ServiceWorker.js", to: "service-worker.js" }],
    })
  );
  config.output.publicPath = "auto";
  return config;
};
