import './css/iconfont.css'
import './css/index.css'
import './less/index.less'
import './sass/index.scss'

import add from './js/demo1'
import reduce from './js/demo2'
// import {myMax} from './js/math'

let ae = 12;
console.log(add(10,ae));
console.log(reduce(100,12));
const myFileter = (a,b,c) => {
    return a+b+c+100;
}
console.log(myFileter(10,10,10));
// console.log(myMax(1000,9999));
//热模块更新: 一般不用，vue，react自己有
if(module.hot) {
    module.hot.accept('./js/demo1')
}


document.querySelector('.btn').addEventListener('click', function () {
    // console.log(count(9,10));
    //import 动态导入: 会将动态导入的文件代码分割(拆分成单独模块), 在需要使用时自动加载
    import(/*webpackChunkName: 'math' */'./js/math')
    .then(({add})=>{
        console.log('模块加载成功',add(9,10));
    })
})