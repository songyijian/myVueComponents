
/**
 ** yijian.song
 * desc json对象深度遍历
 * param { obj } {} | []
 * param {fn } (key,val,obj)=>{}
 * return 新对象
 *
 // deepFor({a:1,b:[13,14,15],c:{e:20,f:30}},(key,val,obj)=>{
 //   console.log(key,val,obj)
 // })
 // a 1 { a: 1, b: [ 13, 14, 15 ], c: { e: 20, f: 30 } }
 // 0 13 [ 13, 14, 15 ]
 // 1 14 [ 13, 14, 15 ]
 // 2 15 [ 13, 14, 15 ]
 // b [ 13, 14, 15 ] { a: 1, b: [ 13, 14, 15 ], c: { e: 20, f: 30 } }
 // e 20 { e: 20, f: 30 }
 // f 30 { e: 20, f: 30 }
 // c { e: 20, f: 30 } { a: 1, b: [ 13, 14, 15 ], c: { e: 20, f: 30 } }
 */

// function deepFor(obj,fn){
//     let objClone = Array.isArray(obj)?[]:{};
//     if(obj && typeof obj==="object"){
//         for(key in obj){fn && fn(key,obj[key]);
//             if(obj.hasOwnProperty(key)){
//                 if(obj[key]&&typeof obj[key] ==="object"){
//                     objClone[key] = deepClone(obj[key],fn);
//                 }else{
//                     objClone[key] = obj[key];
//                 };
//             };
//         }
//     }
//     return objClone;
// }


module.exports = {
  deepFor
}
