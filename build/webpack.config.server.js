const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge'); // 合并配置
const {baseConfig, isDev} = require('./webpack.config.base'); // 依赖base
const miniCssExtractPlugin = require('mini-css-extract-plugin');// 作用：webpack4中：extract-text-webpack-plugin-->mini-css-extract-plugin
const VueSeverPlugin = require('vue-server-renderer/server-plugin')// 服务端渲染
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const plugins = [
  new miniCssExtractPlugin({
    filename: "style.[name].[chunkhash:8].css",
    chunkFilename: "[id].css"
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }),
  new VueLoaderPlugin(),
  new VueSeverPlugin()  // 此插件在输出目录中 vue-ssr-server-bundle.json
];


let config;

if (isDev) {
}
config = merge(baseConfig, {
  target: 'node', // 后端服务,默认是web
  devtool: 'source-map',
  entry: {
    context: path.join(__dirname, '../client/server-entry.js'),
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../public-server/')
  },
  //不要遵循/打包这些模块，而是在运行时从环境中请求他们
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          /* miniCssExtractPlugin.loader,
           不要使用这个loader ,会出现bug
           https://github.com/vuejs/vue-router/issues/2660
           */
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: plugins,
});

module.exports = config;

