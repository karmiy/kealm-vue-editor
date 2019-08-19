const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('../package')

// 排除包
const externals = {};
const isDev = process.argv.includes('--env=dev');
!isDev ? Object.keys(pkg.dependencies).forEach(item => {
    externals[item] = item
}) : ['vue', '@kealm/vue-components'].forEach(item => {
    externals[item] = item
})

module.exports = {
    mode: "production",
    context: path.resolve(__dirname, '../'), // 配置上下文，当遇到相对路径时，会以context为根目录
    entry: {
        main: './src/main.js', // 需要打包的文件入口
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        },
    },
    externals,
    module: {
        rules: [
            {
                test: /\.js$/, // 使用正则来匹配 js 文件
                exclude: /node_modules/, // 排除依赖包文件夹
                use: {
                    loader: 'babel-loader', // 使用 babel-loader
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
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
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            outputPath: 'images/', // 输出到 images 文件夹
                            limit: 10000, // 小于10000K的文件会被转为base64格式
                        }
                    },
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
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000,
                            publicPath: '../fonts/',
                            outputPath: '../fonts/'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '../styles/index.min.css',
            chunkFilename: 'styles/[id].min.css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true //布尔值，指示插件是否以将消息打印到控制台，默认为 true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '..', 'README.md'),
                to: path.resolve(__dirname, '..', 'dist', 'README.md'),
            }
        ])
    ]
};
