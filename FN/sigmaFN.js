/*
* yijian.song
* json第一层对象转成string, Array直接转成string; (sigma通信奇怪约定处理，why！！！！)
  reqToStr([])  //'[]'
  reqToStr({a:1,b:{}})  //{a:1,b:'{}'}
*/
function reqToStr(json){
  if(typeof json === 'object' && Array.isArray(json)){
    return JSON.stringify(json)
  }

  if(typeof json === 'object' ){
    let njson = {}
    for (let [key,val] of  Object.entries(json)) {
      njson[key] = (typeof val === 'object') ? JSON.stringify(val) : val;
    }
    return njson
  }else{return new Error('参数不是合法的JSON')}
}
