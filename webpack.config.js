const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const progressbarWebpack = require('progress-bar-webpack-plugin');

var prod = process.env.NODE_ENV === 'production' ? true : false;

let hostName, devPort;

//可以设置自己电脑IP或者其他
hostName = "";
devPort = "";
let devUrl = "http://localhost:8088/"



module.exports = {
    entry: getEntry(),
    output: {
        path: resolve('./dist'),//输出目录的配置，js,css,img,html等存放目录
        publicPath: prod ? '../' : '/dist/',//js,css,img等资源对应的server目录
        filename: 'js/[name].js',//每个子页面所对应的专用js
        chunkFilename: 'js/common/[id].chunk.js'//按需加载js命名
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    // devtool: "#cheap-module-source-map",
    // progress:true,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs=img:src img:data-src'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // enforce:'pre',
                include: resolve('src'),
                exclude: ['node_modules/'],
                query: {
                    presets: ['latest']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: './img/[name].[ext]',
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/YDW_res/media/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/YDW_res/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',//公共模块提取，什么名为vendors的js
            minChunks: Infinity,
            // chunks: ['home', 'list', 'about'],//提取哪些模块共有的部分
            // minChunks: 3,//至少三个模块共有部分，才会进行提取
            // publicPath:'./dist/static'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true,

        }),

        // new UglifyJsPlugin({
        //     sourceMap:true
        // // }),
        new HtmlWebpackPlugin({
            // favicon: resolve('../src/APPcommon/img/fav.png'),
            filename: 'views/home.html',
            template: './config/index.html',
            inject: 'body',
            chunks: ['vendors', 'home'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            // favicon: resolve('../src/APPcommon/img/fav.png'),
            filename: 'views/list.html',
            template: './config/index.html',
            inject: 'body',
            chunks: ['vendors', 'list'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            // favicon: resolve('../src/APPcommon/img/fav.png'),
            filename: 'views/about.html',
            template: './config/index.html',
            inject: 'body',
            chunks: ['vendors', 'about'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        }),

        new OpenBrowserPlugin({
            url: 'http://localhost:9000/dist/views/home.html',//试验品，设置为home页面，开发时候，可以设置为自己正在开发页面
        }),
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        new progressbarWebpack()
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        host: '127.0.0.1',
        inline: true,
        hot: true,
        noInfo: true,
        historyApiFallback: true,
    },
    performance: {
        hints: false
    },
};

if (prod) {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin('./dist'),
    ])
}

function resolve(dir) {
    return path.join(__dirname, dir)
}


function getEntry() {
    var entry = {};
    //读取开发目录,并进行路径裁剪 
    glob.sync('./src/APPpages/**/*.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
            n = n.split('/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
};