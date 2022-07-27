module.exports = {
    presets: [
        [
            "@babel/preset-env",//智能预设 能够编译es6语法
            {
                useBuiltIns: "usage", //按需加载core.js
                corejs: 3
            }
        ]
    ]
}