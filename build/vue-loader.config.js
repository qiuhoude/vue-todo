// const docsLoader = require.resolve('./doc-loader');

module.exports = (isDev) => {
    return {
        preserveWhitepace: true, // 标签保留空格处理
        extractCSS: !isDev, // 将vue的style中的css是否提取出来
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // css的模块命名
            camelCase: true // 驼峰命名
        },
        // hotReload: false,

        // loaders: {
        //     'docs' : docsLoader,
        // }
    }
};