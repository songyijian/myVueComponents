/*	fn 2.0.0  js常规方法整理,	 作者：songyijian 	, 发布：2016.10.20  */
//这个不错 https : //segmentfault.com/a/1190000011966867

!function(){

    // 截取中文字符
    // cutStr(对象,字数*2) ->返回字段  // 因为汉字两个字节所以*2
    function cutStr(str,L){
        var result = '',
            strlen = str.length,
            chrlen = str.replace(/[^\x00-\xff]/g,'**').length;
        if(chrlen<=L){return str}
        for(var i=0,j=0;i<strlen;i++){
            var chr = str.charAt(i);
            if(/[\x00-\xff]/.test(chr)){
                j++
            }else{
                j+=2
            }
            if(j<=L){
                result += chr
            }else{
                return result
            }
        }
    }



    // 转成万
    function nWanFn(num) {
        return num > 9999
            ? (Math.floor(num / 1000) / 10) + '万'
            : num
    }



    /**
     * desc   现金额转大写
     * param  {Number} n
     * return {String}
     */
    function digitUppercase(n) {
        var fraction = ['角', '分'];
        var digit = [ '零', '壹', '贰', '叁', '肆','伍', '陆', '柒', '捌', '玖' ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    };






    /**
     ** yijian.song
     * desc 清楚json里key=指定值的键值对，并返回处理后的json
     * param {} json
     * param [] rm_val
     * return {}
     * trimKey({a:'',b:1},[''])  //{b:1} 踢出了key=‘’
     */
    function trimKey(json,rm_val) {
      let r_val = Array.isArray(rm_val) ? rm_val: [rm_val]
      let key = Object.keys(json)
      let val = Object.values(json)
      let njson ={}
      val.forEach((item,index)=>{
          if(Object.prototype.toString.call(item).slice(8, -1) === 'Object'){
             njson[key[index]] = trimKey(item,r_val)
          }else {
            if(r_val.indexOf(item)<0){
              njson[key[index]] = item
            }
          }
      })
      return njson
    }





    /**
     ** yijian.song
     * desc 序列化成字符串
     * param {json}
     * return {string}
     *    jsonToStr({a:1,b:23})  //"a=1&b=23"
     */
    //{}序列化成字符串
    function jsonToStr(obj) {
        if (!obj) return '';
        var pairs = [];
        for (var key in obj) {
            var value = obj[key];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return pairs.join('&');
    }






    /**
     * yijian.song
     * desc   序列化转json
     * param  {String} url  default: window.location.href
     * return {Object}
     */
    function strToJson(url) {
        url = url == null ? window.location.href : url
        var search = url.substring(url.lastIndexOf('?') + 1)
        if (!search) { return {} }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }



    /*
    变量模版替换函数 {var}
    return dom str，
    注意：避免src报错，可以使用 :src 来处理
          templateFill( ‘<h1 class="oneline">{TITLE.val}</h1> <img :src="{BODY_BG_IMG.val}"> ’
            ,
              {
                TITLE:{ val:'xxxx' },
                BODY_BG_IMG:{ val:'url......' },
              }
          )
          //<h1 class="oneline">xxxx</h1> <img src="url......">
  */
  function templateFill(str,data) {
    var newStr = str;
    if(typeof str !== "string"){  return console.error('str must be a string.') }

    var strDataKeyList = str.match(/\{[a-zA-Z\.\_]+\}/gi);  //匹配规则
    strDataKeyList.forEach(item=>{
      var keylist = item.substr(1,item.length-2).split('.')
      newStr = newStr.replace(new RegExp(item,"g"), getObj(data.dataList,keylist))
    })
    newStr = newStr.replace(/:src/g, 'src') // 处理静态文件初始化报错
    return newStr

    /* 对象 多层取值方法 */
    function getObj(data,keylist){
      var oj = data;
      keylist.forEach(k=>{ oj = oj[k] })
      return typeof oj==="object" ? JSON.stringify(oj) : oj
    }
  }



  /*
    干掉URL的 origin
      trimRegion("http://wiki.sigmob.cn/pages/viewpage.action?pageId=1083998")
      //"pages/viewpage.action?pageId=1083998"
  */
  export function trimRegion(urlstr) {
    return '/'+urlstr.replace(/https:\/\/|http:\/\//,"").split('/').slice(1).join('/')
  }



  /*
  拷贝
    fn、date 对象不能被成功拷贝
  */
  export function jsonCopy(obj){
      let _obj = JSON.stringify(obj),
          objClone = JSON.parse(_obj);
      return objClone
  }




  /**
  * yijian.song
  * desc   单层json，key转层vlue使用
  * param  {json}
  * return {Array}
  *     jsonToArray({'6000':"商务",'6001':"天气"}) //[{key: "商务", val: "6000"}, {key: "天气", val: "6001"}]
  */
  function jsonToArray(obj) {
    let ndata = []
    for(let [val,key] of  Object.entries(obj)){
      ndata.push({val:key, key:val })
  	}
    return ndata
  }

  //xss 标签转译
  function escapeHtml(str) {
       if (/</g.test(str)){
           str = str.replace(/</g, '&lt;');
           str = str.replace(/>/g, '&gt;');
       }
       return str;
  }



    window.fn = {
        cutStr,     // 截取中文字符
        trimKey,    //修剪掉制定key=值的key，key=‘’
        jsonToStr,  // json序列化，获取url参数 {}->str
        strToJson,  //序列化转json，str->{}

        templateFill,   //{}模版变量替换函数 {var}
        templateFill,   //{}模版变量替换函数 {var}

        goOverDay,      //获取几天前的  date对象

        digitUppercase, //现金额转大写
    }

}()


if (typeof(module) !== 'undefined'){
    module.exports = window.fn
}else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict'
        return window.fn
    })
}
