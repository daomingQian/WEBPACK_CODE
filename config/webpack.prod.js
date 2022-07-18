const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
function getLoader(loader) { //封住获取Loader函数，减少代码复用
    return [
        MiniCssExtractPlugin.loader ,
        "css-loader" ,
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env" //能解决大部分样式兼容性问题
                    ]
                }
            }
        },
        loader
    ].filter(Boolean);
}
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'static/js/main.js',
        clean: true //打包前清空path路径下的文件
    },
    module:{
        rules:[
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: getLoader()
                        //style-loader 被 MiniCssExtractPlugin.loader 替换
                    },
                    {
                        test: /\.less$/,
                        use: getLoader("less-loader")
                    },
                    {
                        test: /\.scss$/,
                        use: getLoader("sass-loader")
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                //小于20kb的图片转base64
                                //优点： 减少请求数量， 缺点： 体积会更大
                                maxSize: 20*1024
                            }
                        },
                        generator: {
                            // 输出图片名称
                            //[hash:10] hash值取前十位
                            filename: 'static/images/[hash:10][ext][query]'
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                        type: 'asset/resource',
                        generator: {
                            //输出名称
                            filename: 'static/media/[hash:10][ext][query]'
        
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,//排除这些文件
                        loader: 'babel-loader',
                        //yarn add babel-loader @babel/core @babel/preset-env要下载这些东西
                        // options: {
                        //     presets: ['@babel/preset-env']
                        // }
                    }
                ]
            }
        ]
    },
    plugins: [
        new EslintPlugin({
            //检测src文件夹下文件
            context: path.resolve(__dirname,'../src')
        }),
        new HtmlPlugin({
            //模板：以public/index.html文件为模板创建新的html文件
            //新的html文件特点：1.结构和原来一致。2.自动引入打包输出的资源
            template: path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({ 
            filename: "static/css/main.css", //所有css 单独打包
        }),
        new CssMinimizerPlugin() //解决css样式兼容性
        
    ],
    mode: 'production',
    devtool: 'source-map' //找出 出错的代码位置 行和列
}