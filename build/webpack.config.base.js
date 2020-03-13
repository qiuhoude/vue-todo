const path = require("path");
const createVueLoaderOptions = require('./vue-loader.config');

const outputPath = path.resolve(__dirname, '../public');
const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
    target: "web",
    entry: path.resolve(__dirname, "../client/index.js"),
    output: {
        filename: "bundle.js",
        path: outputPath,
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
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            },


        ]
    }
};

module.exports = {baseConfig, outputPath, isDev};
