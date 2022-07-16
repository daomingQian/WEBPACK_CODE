import './css/iconfont.css'
import './css/index.css'
import './less/index.less'
import './sass/index.scss'
import add from './js/demo1'
import reduce from './js/demo2'
let ae = 12;
console.log(add(10,ae));
console.log(reduce(100,12));
const myFileter = (a,b,c) =>{
    return a+b+c+100;
}
console.log(myFileter(10,10,10));