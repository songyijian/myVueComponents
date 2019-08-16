/*
 * @Description: 拆分模块
 * @Author: yjsong
 * @Date: 2019-07-29 11:46:04
 * @LastEditTime: 2019-07-29 17:48:42
 * @LastEditors: Please set LastEditors
 *
 * mock url 有参数执行处理
 */


// Schedule - 小时周期控件
// Mock.mock(/mock\/Schedule/,
//   // function (str) {
//     // console.log('mock', str)
//     // return (
//       {
//         code: 200,
//         msg: "成功！",
//         "data|168": [Mock.Random.integer(0, 1)],
//       }
//   // )}
// )




Mock.mock(/mock\/Schedule/,
  function (str) {
    console.log('mock', str,[].fill(1,168))
    return (
      {
        code: 200,
        msg: "成功！",
        "data":Array(168).fill(1)
      }
  )}
)
