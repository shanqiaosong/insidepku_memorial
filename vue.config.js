const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
    liveReload: false,
    https: true,
  },
  // chainWebpack: (config) => {
  //   config.module.rules.delete('svg')
  //
  //   config.module
  //       .rule('svg')
  //       .test(/\.(svg)(\?.*)?$/)
  //       .use('vue-loader')
  //       .loader('vue-loader')
  //       .end()
  //       .use('vue-svg-loader')
  //       .loader('vue-svg-loader')
  // },
})
