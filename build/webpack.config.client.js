const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge'); // 合并配置
const {baseConfig, isDev} = require('./webpack.config.base'); // 依赖base

// 作用：webpack4中：extract-text-webpack-plugin-->mini-css-extract-plugin
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// 服务端渲染使用 的 client-plugin
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const devServer = {
  port: 9200,
  host: '0.0.0.0',
  hot: true,//页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
  // open: true,
  overlay: {
    error: true
  },
  // contentBase: outputPath,
  // before(app) {
  //     let openInEditor = require('launch-editor-middleware');
  //     app.use('/__open-in-editor', openInEditor())
  // },
  historyApiFallback: {
    index: '/public/index.html'
  },
  headers:{'Access-Control-Allow-Origin': '*'}, // 提供跨域头解决跨域问题

};

const defaultPlugins = [
  new webpack.DefinePlugin({// 允许创建一个在编译时可以配置的全局常量
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"',
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './template.html')
  }),
  new VueClientPlugin(), // 默认输出文件 vue-ssr-client-manifest.json 可以在源码client-plugin.js中查看
];

let config;

if (isDev) {
  // 合并配置
  config = merge(baseConfig, {
    output: {
      publicPath: `http://127.0.0.1:${devServer.port}/public/`, // 对外访问的路径
    },
    devtool: "#cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          // style-loader：使用<style></style>将css-loader内部样式注入到我们的HTML页面
          // css-loader：读取css文件内容
          use: ['style-loader', 'css-loader'],
        },
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
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]),
  });
} else {
  config = merge(baseConfig, {
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            miniCssExtractPlugin.loader,
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
    optimization: {
      minimize: true,
      // runtimeChunk: {
      //   name: entrypoint => `runtime~${entrypoint.name}`
      // },
    },
    plugins: defaultPlugins.concat([
      // 分离 css
      new miniCssExtractPlugin({
        filename: "style.[name].[chunkhash:8].css",
        chunkFilename: "[id].css"
      }),
    ])
  });
}
config = merge(config, {

})

module.exports = config;

