const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        publicPath: './',
        filename: '[name]-[contentHash:5].bundle.js',
        chunkFilename: '[name]-[contentHash:5].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, // 针对 .css 后缀的文件设置 loader
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    'postcss-loader',
                    'sass-loader' // 使用 sass-loader 将 scss 转为 css
                ]
            },
            /*{
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // 压缩 jpg/jpeg 图片
                            mozjpeg: {
                                progressive: true,
                                quality: 65 // 压缩率
                            },
                            // 压缩 png 图片
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            // 压缩 gif 图片
                            gifsicle: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    },
                ]
            },*/
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true //布尔值，指示插件是否以将消息打印到控制台，默认为 true
        }),
    ],
})
