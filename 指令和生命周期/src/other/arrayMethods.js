import {def} from './util'

 
 
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'sort',
  'splice',
  'reverse' // 反转数组的元素
]

const arrayPrototype = Array.prototype

export const arrayMethods = Object.create(arrayPrototype)

for(let item of methods) {
  arrayMethods[item]
  const original = arrayPrototype[item]
   
  // 定义新的方法
  def(arrayMethods, item, function(){
    // console.log('fsehfusefjshfhsefsf', arguments);
    // 把这个数组身上的 __ob__ 取出来，
    const __ob__ = this.__ob__
    // push/unshift/splice能插入新项，现在要把插入的新想也加入ob（Observer）
    let inseerted = []
    // arguments 是一个对应于传递给函数的参数的类数组对象。
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
  //  console.log('this',this);
    // this的指向是数组实例,回复原来功能
    const result = original.apply(this, arguments)
    __ob__.dep.notify()

    // 有些方法有返回值所以return是必须的
    return result
  }, false)

}

 