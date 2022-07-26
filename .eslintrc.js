module.exports = {
    //继承
    extends: ["eslint:recommended"],
    env: { //使用 env 关键字指定你想启用的环境，并设置它们为 true
        node: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    rules: {
        "no-var" : 2
    },
    plugins: ['import'] //解决动态导入语法
}