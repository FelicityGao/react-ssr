const path = require('path');

module.exports = {
  entry:  "./server/index.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@utils": path.resolve("src/utils")
    }
  }
};