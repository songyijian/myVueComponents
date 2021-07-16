/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-16 10:26:18
 */
export function tIntervarl(fn, t = 0, ...args) {
  clearTimeout(ot);
  let time = t;
  var ot = setTimeout(function func() {
    fn.apply(this, args);
    ot = setTimeout(func, time);
  }, t);

  var setTime = n => (time = n);
  var clear = () => {
    clearTimeout(ot);
    time = ot = null;
  };

  return { clear, setTime };
}
