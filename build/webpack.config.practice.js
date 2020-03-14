const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge'); // 合并配置
const {baseConfig} = require('./webpack.config.base'); // 依赖base


const devServer = {
  port: 8080,
  host: '0.0.0.0',
  hot: true,//页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
  // open: true,
  overlay: {
    error: true
  },

};

const defaultPlugins = [
  new webpack.DefinePlugin({// 允许创建一个在编译时可以配置的全局常量
    'process.env': {
      NODE_ENV: '"development"',
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname,'./template.html')
  })
];


// 合并配置
let config = merge(baseConfig, {
  entry: path.join(__dirname, "../practice/index.js"),
  devtool: "#cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader', //  能够编译生成sourceMap
            options: {
              sourceMap: true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
            }
          },
          'stylus-loader'
        ],

      },
    ],
  },
  resolve: {
    alias: {
      // 自定 import Vue from 'vue 中的vue,
      // 默认是vue.runtime.esm.js, 这个vue是没有template属性的
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  devServer,
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]),
});

module.exports = config;

