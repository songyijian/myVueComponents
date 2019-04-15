

/*
  cssSupports 判断当前浏览器是否支持css属性
  cssSupports('font') //true
  // 错误值会挂掉
*/
var cssSupports = (function() {
	var div = document.createElement('div'),
		vendors = 'Khtml O Moz Webkit'.split(' '),
		len = vendors.length;
	return function(prop) {
		if ( prop in div.style ) return true;
		if ('-ms-' + prop in div.style) return true;
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
    // 这里不合理
		while(len--) {
			if ( vendors[len] + prop in div.style ) {
			return true;
		}
	}
		return false;
	};
})();


// 3.3 setCookie
/**
 * desc  设置Cookie
 * param {String} name
 * param {String} value
 * param {Number} days
 */
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}


// 3.1 getCookie
/**
 * desc 根据name读取cookie
 * param  {String} name
 * return {String}
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return ''
}



// 3.2 removeCookie
/**
 * desc 根据name删除cookie
 * param  {String} name
 */
// var setCookie = require('./setCookie');
function removeCookie(name) {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, '1', -1)
}
