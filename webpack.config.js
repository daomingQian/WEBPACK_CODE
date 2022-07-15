const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'static/js/main.js',
        clean: true //打包前清空path路径下的文件
    },
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
            }
        ]
    },
    plugins: [
        new EslintPlugin({
            //检测哪些文件
            context: path.resolve(__dirname,'src')
        })
    ],
    mode: 'development'
}