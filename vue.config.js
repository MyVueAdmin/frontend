module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  baseUrl: "",
  assetsDir: "assets",
  // filenameHashing: false,
  css:{
    extract: {
      filename: "assets/css/[name].[contenthash:8].css"
    }
  }
}