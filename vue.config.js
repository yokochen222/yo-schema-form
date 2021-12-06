const { resolve } = require("path");
module.exports = {
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        "/": resolve("./"),
        "@": resolve("src"),
      },
    },
  },
};
