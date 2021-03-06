const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: 'source-map', // 开启调试
    output: {
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        port: 8080, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
            // 跨域代理转发
            '/help': {
                target: 'https://www.wangsucloud.com/base-portal/frontpages/help/menu/HELP',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    [`^/help`]: '/'
                },
                logLevel: 'debug',
                headers: {
                    Cookie: ''
                }
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, // 针对 .css 后缀的文件设置 loader
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热部署模块
        new webpack.NamedModulesPlugin(),
    ]
})
