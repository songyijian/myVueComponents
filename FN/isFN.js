/*
isFn 1.0.0 , 判断函数
作者：songyijian
发布：2018.07.12
*/

!function(){

    /**
      数据类型验证
    */
    function isString (o) { //是否字符串
        return Object.prototype.toString.call(o).slice(8, -1) === 'String'
    }

    function isNumber (o) { //是否数字
        return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
    }

    function isBoolean (o) { //是否boolean
        return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
    }

    function isFunction (o) { //是否函数
        return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
    }

    function isNull (o) { //是否为null
        return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
    }

    function isUndefined (o) { //是否undefined
        return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
    }

    function isObj (o) { //是否对象
        return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
    }

    function isArray (o) { //是否数组
        return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
    }

    function isDate (o) { //是否时间
        return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
    }

    function isRegExp (o) { //是否正则
        return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
    }

    function isError (o) { //是否错误对象
        return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
    }

    function isSymbol (o) { //是否Symbol函数
        return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
    }

    function isPromise (o) { //是否Promise对象
        return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
    }

    function isSet (o) { //是否Set对象
        return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
    }

    function isFalse (o) { //是不是 false
        if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
            return false
    }

    function isTrue (o) { //是不是true
        return !this.isFalse(o)
    }

    function isInteger(obj) { //是不是整数
        try {
          return typeof obj === 'number' && obj%1 === 0
        } catch (e) {
          return false
        }
    }



    // 返回小数点后有几位
    function getFloatN(n) {
      try {
        if(typeof n === "number"){
          return Number.isSafeInteger(n) ? 0 : n.toString().split('.')[1].length
        }else {
          return false
        }
      } catch (e) {
        return false
      }
    }



    /**
      表单验证 ===========================================================================
    */

    /**
     * desc  isIdCard 判断是否为身份证号
     * param  {String|Number} str
     * return {Boolean}
     */
    function isIdCard(str) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }

    /**
     * desc   isPhoneNum 判断是否为手机号
     * param  {String|Number} str
     * return {Boolean}
     */
    function isPhoneNum(str) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
    }

    /**
     * desc   判断是否为URL地址
     * param  {String} str
     * return {Boolean}
     */
    function isUrl(str) {
        return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
    }


    /**
    * yijian.song
    * desc  字符串里面是否包含中文字符
    * return {Boolean}
        containCN('zh_CN')  false
        containCN('zh_CN 中文') true
    */
    function containCN(str) {
        return !(escape(str).indexOf("%u") < 0)
    }


    window.fn = {
        getFloatN,  //返回小数点后有几位
        isIdCard,   //判断是否为身份证号
        isPhoneNum, //判断是否为手机号
        isUrl,      //判断是否为URL地址
        containCN,  //是否包含中文字符
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
