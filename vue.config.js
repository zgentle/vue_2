module.exports = {
  // 放置静态资源
  assetsDir: "static",
  publicPath: "./",
  // 指定生成的 index.html
  indexPath: "index.html",
  outputDir: "dist",
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    compress: true,
    proxy: {
      '/mock': {
        target: `http://localhost:9099`,
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: { //重写接口地址
          '^/mock': ''
        },
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      },
    }
  }
}