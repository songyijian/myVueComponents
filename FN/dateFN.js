


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  
  return fmt;
}









// 获取两个如期之间的所有日期列表

/**
 * new Date() 转 yy-mm-ss
 * toYYMMSS(new Date())       // "2018-10-12"
 * toYYMMSS("2019-01-09T11:19:07.483Z") // "2019-01-09"
 */
function dateToYYMMSS(oDate) {
    function isDate(o) { return Object.prototype.toString.call(o).slice(8, -1) === 'Date' }
    if (typeof oDate === 'undefined') {
        new Error('参数错误');
        return
    }
    let timeDate = null;
    if (isDate(oDate)) {
        timeDate = oDate
    } else if (typeof oDate === "string") {
        let stime = new Date(oDate)
        if (stime == "Invalid Date") {
            new Error('不是一个合法参数')
            return
        } else {
            timeDate = stime
        }
    } else {
        new Error('不是一个合法参数')
        return
    }
    let mouth = (timeDate.getMonth() + 1) >= 10 ? (timeDate.getMonth() + 1) : ('0' + (timeDate.getMonth() + 1));
    let day = timeDate.getDate() >= 10 ? timeDate.getDate() : ('0' + timeDate.getDate());
    return timeDate.getFullYear() + '-' + mouth + "-" + day
}




/*
  yy-mm-ss 转 时间戳
  YYMMSStogetTime('2018-02-03') //1517641870166
*/
function YYMMSStogetTime(timeStr) {
  var timearr = timeStr.split("-");
  return new Date().setUTCFullYear(timearr[0], timearr[1] - 1, timearr[2]);
}



/*

  获取日期之前所有的天数
  依赖：dateToYYMMSS 、 YYMMSStogetTime
*/
function BetweenDay(begin, end) {
    var unixDb = YYMMSStogetTime(begin);
    var unixDe = YYMMSStogetTime(end);
    var arrtimelist = []
    for (var k = unixDb; k <= unixDe;) {
        arrtimelist.push(dateToYYMMSS(new Date(parseInt(k))))
        k = k + 24 * 60 * 60 * 1000;
    }
    return arrtimelist
}




//判断某年某月的1号是星期几
function getFirstDay(_year,_month) {
    var allDay = 0, y = _year-1, i = 1;
    allDay = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + 1;
    for ( ; i<_month; i++) {
        switch (i) {
            case 1: allDay += 31; break;
            case 2:
                if(runNian(_year)) { allDay += 29; }
                else { allDay += 28; }
                break;
            case 3: allDay += 31; break;
            case 4: allDay += 30; break;
            case 5: allDay += 31; break;
            case 6: allDay += 30; break;
            case 7: allDay += 31; break;
            case 8: allDay += 31; break;
            case 9: allDay += 30; break;
            case 10: allDay += 31; break;
            case 11: allDay += 30; break;
            case 12: allDay += 31; break;
        }
    }
    return allDay%7;
}





//判断闰年
function runNian(_year) {
    if(_year%400 === 0 || (_year%4 === 0 && _year%100 !== 0) ) {
        return true;
    }
    else { return false; }
}



/*
每个月有几天
依赖 runNian（）
mDays[x]==x月份的天数，x为0至11的自然数。
*/
var mDays=new Array(31,28+runNian(ynow),31,30,31,31,30,31,30,31,30,31);

// 当前月份
new Date().getMonth()+1
// 当前年
new Date().getFullYear()
// 当前日期
new Date().getDate()
// 当前星期几
new Date().getDay()

new Date(2008,3,1)


/*
今天星期几
new Date().getDay() //返回自然数0～6
0表示星期7，1表示星期二，2表示星期三，其余依此类推
*/
new Date().getDay() === 0 ? 7 : new Date().getDay()

    /*
    ** yijian.song
    * desc  获取n天前的date对象
    * param {Number} n=0
    * return date
    *  goOverDay(2)  //2018-07-04T09:53:04.226Z 两天前date
    */
    function goOverDay(n=0) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * n);
      return (start)
    }


/**
 * 根据年月生成日历数组信息
*/
function getMonthDayArray(year,month) {
  function runNian(_year) { //判断闰年
      if(_year%400 === 0 || (_year%4 === 0 && _year%100 !== 0) ) { return true; }else { return false; }
  }
  var _y =  year || new Date().getFullYear();
  var _m = month ? month-1 : new Date().getMonth(); //几月份
  // 获取哪年的x月有几天
  function getdaylength(a_year,a_month) {
    return new Array(31,28+runNian(a_year),31,30,31,31,30,31,30,31,30,31)[a_month]
  }
  var dn = getdaylength(_y,_m);
  var arrs = [];

  for (var i = 1; i <= dn; i++) {
    var times = `${ _y }-${ _m+1<10 ? '0'+(_m+1) : _m+1 }-${ i<10 ? '0'+i : i }`;
    var od = new Date(times);
    arrs.push({
      time:times,
      date:od,
      week:od.getDay()+1
    })
  }
  return arrs
}
