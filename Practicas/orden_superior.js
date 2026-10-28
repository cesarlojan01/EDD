function mayor(n){
    return m => m > n
}

let mayorQue = mayor(10)
console.log(mayorQue(11))