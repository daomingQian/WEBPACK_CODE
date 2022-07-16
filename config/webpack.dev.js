const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: ["style-loader" , "css-loader" ,  "less-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader","css-loader","sass-loader"]
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
        })
        
    ],
    //开发服务器
    devServer:{
        host: 'localhost', //启动服务器域名
        port: '3000',
        open: true, //是否自动打开浏览器
    },
    mode: 'development'
}