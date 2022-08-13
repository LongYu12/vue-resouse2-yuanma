// push/pop/shift/unshift/splice(插入删除)/sort(排序)/reverse(倒序)
// 引入修改对象属性的方法
import {def} from './utils'

// 要被改写的方法
const changeArrayMethods = [
  'reverse',
  'sort',
  'splice',
  'unshift',
  'shift',
  'pop',
  'push'
]

// 得到 Array.prototype 
const arrayPrototype = Array.prototype

// Array.prototype 为 arrayMethods 的原型
export const arrayMethods = Object.create(arrayPrototype)

console.log('arrayMethods', arrayMethods);

changeArrayMethods.forEach(item => {
  // 备份原来的方法
  const original = arrayPrototype[item]
   
  // 定义新的方法
  def(arrayMethods, item, function(){
    // 把这个数组身上的 __ob__ 取出来，
    const __ob__ = this.__ob__
    // push/unshift/splice能插入新项，现在要把插入的新想也加入ob（Observer）
    let inseerted = []

    switch (item) {
      case 'push':
      case 'unshift':
        inseerted = arguments
        break;
      case 'splice':
        // splice的参数格式是splice(下标， 要删除的项目数, 插入的项)
        inseerted = [...arguments].slice(2)
     
        break;
      default:
        break;
    }

    // 有没有要插入的新项
    if (inseerted.length) {
      __ob__.observeArray(inseerted)
    }

    // this的指向是数组实例,回复原来功能
    const result = original.apply(this, arguments)
    
    __ob__.dep.notify()

    // 有些方法有返回值所以return是必须的
    return result
  }, false)
})

   
 