/*
 * @Description:
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-07-08 11:38:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-08 18:11:19
 */

/**
 * 找出单层数组，重复值的始末位置
 * @param {Array} arr
 * @param {string | number} flag 筛选样本
 * @param {number} keep 连续重复位数 注意：别他妈给我个1，一位算重复吗？
 * @return {Array}
 *  getRepeat([1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1], 1, 2)
 *      >[{"val":1,"length":3,"start":0,"end":2},{"val":1,"length":4,"start":5,"end":8},{"val":1,"length":2,"start":14,"end":15}]
 */
export function getRepeat(arr, flag = 1, keep = 3) {
  let start = arr.length + 1;
  let m = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == flag) {
      if (start > i) start = i;
      // 最后一位差异处理
      if (i == arr.length - 1 && i - start >= keep - 1) {
        m.push({
          val: flag,
          length: i + 1 - start,
          start: start,
          end: i
        });
        start = arr.length + 1;
      }
    } else {
      if (i - start >= keep) {
        m.push({
          val: flag,
          length: i - start,
          start: start,
          end: i - 1
        });
      }
      start = arr.length + 1;
    }
  }
  return m;
}

export function inState(nums) {
  let dayMolecule = [];
  let n = 0;
  for (let i = 0; i < 7; i++) {
    dayMolecule.push(nums.slice(n, n + 24));
    n = n + 24;
  }
  return dayMolecule;
}

export function undoState(val) {
  return val.flat(2);
}

export function copy(arr) {
  return [...arr.map(item => [...item])];
}
