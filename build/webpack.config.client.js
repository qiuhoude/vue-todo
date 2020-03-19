const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge'); // 合并配置
const {baseConfig, outputPath, isDev} = require('./webpack.config.base'); // 依赖base

// 作用：webpack4中：extract-text-webpack-plugin-->mini-css-extract-plugin
const miniCssExtractPlugin = require('mini-css-extract-plugin');


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
  historyApiFallback:{
    index:'/public/index.html'
  },
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
  })
];

let config;

if (isDev) {
  // 合并配置
  config = merge(baseConfig, {
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
module.exports = config;

