const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

config = {
    target: "web",
    mode: "development",
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
            },
            {
                // css-loader：读取css文件内容
                // style-loader：使用<style></style>将css-loader内部样式注入到我们的HTML页面
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // 将图片转化成base64 代码，直接写在js内容里面，而不用生成新的文件，对于小图片有用，可减少http请求
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ],

            },

        ]
    },
    plugins: [
        new webpack.DefinePlugin({// 允许创建一个在编译时可以配置的全局常量
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"',
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin()
    ],

};

// console.info('----> ', isDev);
if (isDev) {
    config.devtool = "#cheap-module-eval-source-map";

    let openInEditor = require('launch-editor-middleware')
    config.devServer = {

        // contentBase: path.resolve(__dirname, "dist"),
        port: 9200,
        host: '0.0.0.0',
        hot: true,//页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
        // open: true,
        overlay: {
            error: true
        },
        // before(app) {
        //     app.use('/__open-in-editor', openInEditor())
        // },
    };
}


module.exports = config;
