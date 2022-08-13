let rep = '我是|你好|他的'
// subs要匹配的， index:匹配到的所在下表,str:匹配的字符窜
// 常用用法
console.log(rep.replace(/\|/g, ']'));
/* 
  0: "|"
  1: 2
  2: "我是|你好|他的"
*/
// console.log(rep.replace(/\|/g, function(subs, index, str){
//   console.log(subs,index,str);
//   // console.log(arguments);
//   return '__'
// }));
 