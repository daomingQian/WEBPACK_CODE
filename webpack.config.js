const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'static/js/main.js'
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
            }
        ]
    },
    plugins: [],
    mode: 'development'
}