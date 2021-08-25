// @ts-chect

/*
 * @Description: 工具方法
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-12 15:40:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 18:09:09
 */

// export function tIntervarl(fn, t = 0, ...args) {
//   clearTimeout(ot)
//   let time = t
//   var ot = setTimeout(function func() {
//     fn.apply(this, args)
//     ot = setTimeout(func, time)
//   }, t)

//   var setTime = n => (time = n)
//   var clear = () => {
//     clearTimeout(ot)
//     time = ot = null
//   }

//   return { clear, setTime }
// }

/**
 * @description: 分位格式化
 * @param {number} num
 * @param {number} unit 进制
 * @return {string}
 * enQuantile(3233445454.243567) >"3,233,445,454.243567"
 */
function quantile(n, unit) {
  let t = ''
  while (n.length > unit) {
    t = ',' + n.slice(-unit) + t
    n = n.slice(0, n.length - unit)
  }
  return n + t
}
export const enQuantile = function (num = '', unit = 3) {
  let t = String(num).replace(/[^0-9|^\.]/gi, '')
  let anchor = t.lastIndexOf('.')
  if (anchor < 0) return quantile(t, unit)
  t = t.replace(/\./gi, '')
  let head = t.slice(0, anchor)
  let after = t.slice(anchor)
  return quantile(head, unit) + '.' + after
}

/**
 * @description: 反解分位
 * @param {string} str
 * @param {function} type Number｜String 得到类型的构造函数
 * @return {string ｜ number}
 * 12,34,56,78 > 12345678
 */
export const deQuantile = (str = '', type = Number) => {
  if (str === '') return
  let a = String(str).split(',').join('')
  return type(a)
}
