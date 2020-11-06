
require("asset-require-hook")({
  extensions: ["svg", "css", "less", "jpg", "png", "gif"],
  name: '/static/media/[name].[ext]'
});
require('@babel/register')({
  presets: [ '@babel/preset-env' ]
});
require('@babel/polyfill');

require("./app");
