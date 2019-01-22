module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: "",
  assetsDir: "assets",
  // filenameHashing: false,
  css:{
    extract: {
      filename: "assets/css/[name].[contenthash:8].css"
    }
  }
}