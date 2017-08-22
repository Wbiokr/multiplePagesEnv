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
// hostName = "127.0.0.1";
hostName = "192.168.1.83";//陈博先电脑ip
devPort = "8088";

let entryObj = getEntry();

let pageNameList = Object.keys(entryObj);

let proHtmlPlugin = [];

for (let i = 0; i < pageNameList.length; i++) {
    proHtmlPlugin.push(getHtmlPlugin(pageNameList[i]))
}

module.exports = {
    entry: entryObj,
    output: {
        path: resolve('./dist'),//输出目录的配置，js,css,img,html等存放目录
        publicPath: prod ? '../' : '/dist/',//js,css,img等资源对应的server目录
        filename: 'js/[name].js',//每个子页面所对应的专用js
        chunkFilename: 'js/common/[id].chunk.js'//按需加载js命名
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'common':resolve('./src/APPcommon')
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
                enforce: 'pre',
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
                    use: ['css-loader','postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader']
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
            minChunks: pageNameList.length,//至少三个模块共有部分，才会进行提取
            // publicPath:'./dist/static'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true,

        }),
        new OpenBrowserPlugin({
            url: 'http://' + hostName + ':' + devPort + '/dist/views/test.html',//测试页面选择test.html，可以自己更改
        }),
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        new progressbarWebpack()
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: devPort,
        host: hostName,
        inline: true,
        hot: true,
        noInfo: true,
        historyApiFallback: true,
    },
    performance: {
        hints: false
    },
};

module.exports.plugins = (module.exports.plugins || []).concat(proHtmlPlugin);

if (prod) {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin('./dist'),
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
};

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

function getHtmlPlugin(name) {
    return (new HtmlWebpackPlugin({
        // favicon: resolve('../src/APPcommon/img/fav.png'),
        filename: 'views/' + name + '.html',
        template: './src/APPcommon/view/index.html',
        inject: 'body',
        chunks: ['vendors', name],
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        }
    })
    )
}