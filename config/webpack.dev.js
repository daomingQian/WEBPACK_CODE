const os = require('os')
const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const cpuCount = os.cpus().length; //cpu 核数
module.exports = {
    entry: './src/main.js',
    output: {
        path: undefined,
        filename: 'static/js/[name].js', //可以兼容多入口
        chunkFilename: 'static/js/[name].chunk.js', //给打包输出的其他js文件命名
        assetModuleFilename: 'static/media/[hash:10][ext][query]', //图片,字体等通过type: 'asset',处理的资源文件统一路径和配置
    },
    module:{
        rules: [
            {
                oneOf: [ //让我们的文件只被一个loader配置，提高打包和编译的速度
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
                        // generator: {
                        //     // 输出图片名称
                        //     //[hash:10] hash值取前十位
                        //     filename: 'static/images/[hash:10][ext][query]'
                        // }
                    },
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                        type: 'asset/resource',
                        // generator: {
                        //     //输出名称
                        //     filename: 'static/media/[hash:10][ext][query]'
        
                        // }
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/,//排除这些文件  （排除和包含二选一）
                        include: path.resolve(__dirname,'../src'), //只包含src目录下的js文件
                        use: [
                            {
                                loader: 'thread-loader', //开启多进程
                                options: {
                                    Worker: cpuCount, //进程数量
                                }
                            },
                            {
                                loader: 'babel-loader', //es6转es5
                                //yarn add babel-loader @babel/core @babel/preset-env要下载这些东西
                                options: {
                                    // presets: ['@babel/preset-env']
                                    cacheDirectory: true, //开启babel缓存
                                    cacheCompression: false, //关闭缓存文件压缩
                                    plugins: ['@babel/plugin-transform-runtime'], //减少代码体积
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new EslintPlugin({
            //检测src文件夹下文件
            context: path.resolve(__dirname,'../src'),
            exclude: 'node_modules', //排除这个目录下的文件
            cache: true, //开启缓存
            cacheLocation: path.resolve(
                __dirname,
                '../node_modules/.cache/eslint-cache-dev'
            ),
            threads: cpuCount, //开启多进程和设置进程数量

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
        hot: true, //模块热替换
    },
    mode: 'development',
    devtool: 'cheap-module-source-map' //找出 出错的代码位置 行
}