module.exports = {
  devServer: {
    disableHostCheck: true,
  
  publicPath: process.env.NODE_ENV === 'production'
    ? '/msdv-thesis/'
    : '/'
  }
}

