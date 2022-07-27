export function myMax(a,b){
    return Math.max(a,b)
}

export function myMin(a,b){
    return Math.min(a,b)
}

export function add(...rest) {
    return rest.reduce((total,item)=>total+item,0);
}

export function fn(...rest) {
    return rest.reduce((total,item)=>total+item,0);
}