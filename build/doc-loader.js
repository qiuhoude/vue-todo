// 自定义文档的loader loader

module.exports = function (source, map) {
    this.callback(null, 'module.exports = function(Component) {Component.options.__docs = ' +
        JSON.stringify(source) +
        '}', map)
};