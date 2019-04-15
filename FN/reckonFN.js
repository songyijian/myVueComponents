// 算法


/**
 * yijian.song
 * 2018.07.27
 * 找出简单数组中重复值的始末位置
 *  arr {array *} 数组
 *  val {string | number *} 筛选样本
 *  keep {number * } 连续重复位数 注意：别他妈给我个1，一位算重复吗？
 *
 *  return {[
 *    {
 *      val: 1,     //筛选样本
        length: 4,  //重复了几次
        start: 6,   //重复值在数组的始位置索引
        end: 9      //重复值在数组的结束位置索引
      }
 * ]}
 *
 *  RepeatBit([...'011000111101011110'],1)  >[ { val: 1, length: 4, start: 6, end: 9 },{ val: 1, length: 4, start: 13, end: 16 } ]
 * */


function RepeatBit(arr, val, keep = 3) {
  if (!Array.isArray(arr)) { return Error('参数必须是合法数组') }
  if (typeof val === 'undefined') { return Error('重复参考样本不能为空') }
  var start = arr.length + 1, m = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      if (start > i) start = i
    } else {
      if ((i - 1) - start >= keep) {
        m.push({
          val: val,
          length: (i - 1) - start,
          start: start,
          end: (i - 1)
        })
      }
      start = arr.length + 1
    }
  }
  return m
}

// 上面的更精简
// function RepeatBit(arr,val,keep=3) {
//   if(!Array.isArray(arr)){ return Error('参数必须是合法数组')}
//   if (typeof val === 'undefined') { return Error('重复参考样本不能为空')}
//   var m =[]
//   arr.forEach((item, index) => {
//     item == val ? m.push(index) : null
//   })
//   var gs = []
//   var t=0;
//   var y=1;
//   for (; t < m.length-1; ){
//     if (m[t + y] - m[t] === y) {
//       y++
//     }else{
//       if(y>keep-1){
//         gs.push({
//           val:val,
//           length: m[t + y - 1] - m[t]+1,
//           start: m[t],
//           end: m[t + y - 1]
//         })
//       }
//       t=t+y;
//       y=1;
//     }
//   }
//   return gs
// }



