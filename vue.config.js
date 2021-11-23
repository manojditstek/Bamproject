const webpack = require('webpack')
module.exports = {
  //Setting here public path for deployment
  publicPath: process.env.NODE_ENV === 'production'? '': '/',
  devServer: {
    port: 8081,
  },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    },
  filenameHashing: false,
}

