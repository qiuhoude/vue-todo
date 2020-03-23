const path = require("path");
const createVueLoaderOptions = require('./vue-loader.config');

const outputPath = path.join(__dirname, '../public/client');
const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
  target: "web",
  mode: process.env.NODE_ENV || 'production',
  entry: path.join(__dirname, "../client/client-entry.js"),
  output: {
    filename: "bundle.js",
    path: outputPath,
    publicPath:'http://127.0.0.1:9200/public/',
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 在加载之前进行预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // 将图片转化成base64 代码，直接写在js内容里面，而不用生成新的文件，对于小图片有用，可减少http请求
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },


    ]
  }
};

module.exports = {baseConfig, outputPath, isDev};
