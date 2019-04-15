
/**
 ** yijian.song
 * desc 清楚json里key=指定值的键值对，并返回处理后的json
 * param {} json
 * param []  > string | array | function
 * return {} 深拷贝对象
 * trimKey({a:'',b:1},[''])  //{b:1} 踢出了key=‘’
 */
function jsonMap(obj, fn) {
    // if (obj == null) {
    //     throw new TypeError(" this is null or not defined")
    // }
    // if (Object.prototype.toString.call(obj) !== "[object Object]" || Object.prototype.toString.call(obj) !== "[object Array]") {
    //     return obj
    // }
    let json = obj //Object(obj)

    if (typeof fn != 'function') {
        throw new TypeError(fn + " is not a function")
    }
    let key = Object.keys(json)
    let val = Object.values(json)
    let njson = {}
    key.forEach((item, index) => {
        let fnRetrun = fn(val[index], key[index], json)
        if (fnRetrun.key !== false) {
            njson[fnRetrun.key] = (fnRetrun.deep === false) ? fnRetrun.val : jsonMap(fnRetrun.val, fn)
        }
    })

    return njson
}

jsonMap({
    a:1,
    b:[2,3],
    c:'4',
    d:{e:5}
}, (val,key)=>{
        console.log(key, val)
    return {
        key,
        val,
        deep:true
    }
})