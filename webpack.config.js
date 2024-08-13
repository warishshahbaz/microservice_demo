const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Use `static` instead of `contentBase`
    },
    port: 3000, // Port for the host app
    historyApiFallback: true, // Enables support for React Router (SPA)
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-jsx"],
          },
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          "style-loader", // Injects styles into the DOM
          "css-loader", // Interprets `@import` and `url()` like `import/require()` and will resolve them
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "hostApp",
      remotes: {
        remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js", // Verify URL and module name
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your template file
    }),
  ],
};
