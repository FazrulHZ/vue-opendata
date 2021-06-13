const version = require('./package.json').version

const cssConfig = {}
let chainWebpackConfig = config => config

if (process.env.NODE_ENV === 'production') {
  cssConfig.extract = {
    filename: `css/[chunkhash].${version}.css`,
    chunkFilename: `css/[chunkhash].${version}.css`
  }

  chainWebpackConfig = config => {
    config.output
      .filename(`js/[chunkhash].${version}.js`)
      .chunkFilename(`js/[chunkhash].${version}.js`)
  }
}

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  chainWebpack: chainWebpackConfig,

  css: cssConfig,

  productionSourceMap: false
}
