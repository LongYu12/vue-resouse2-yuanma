
import { ob } from './src/lib/ob'
import Watcher from './src/lib/Watcher'
import Dep from './src/lib/Dep'
let obj = {
  a: {
    b: {
      c: 88
    }
  },
  d: 66,
  g: [6, 3, 777, 5]
}

ob(obj)
// obj.d = {a: {
//   s:'aa'
// }}
// console.log(obj);
// obj.a.b.c = '啦啦啦啦'
// console.log(obj.a.b.c);
console.log('=======================');
// 数组操作方法：push/pop/shift/unshift/splice(插入删除)/sort(排序)/reverse(倒序)
// obj.g.push('接受')
// console.log(obj.g.splice(2, 0, { a_: 4444 }), obj.g);
console.log('我是分割下++++++++++++++++++++');
new Watcher(obj, 'g.1', (val) => {
  alert(val)
  console.log('---------0------', val);
})
console.log('我是分割下++++++++++++++++++++');
 
obj.g[1] = 5555
 
// obj.d = 44
// console.log('响应式', obj);

