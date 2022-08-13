import  {def} from "./utils";
import defineReactive from './defineReactive'
import Dep from './Dep'
import {arrayMethods} from './array'
import {ob} from './ob'
// ObjServer类的目的是：将一个正常的object转换为每个层级的属性都是响应式（可以被侦察）object
// ObjServer的作用是给每个数据加入属性
export default class ObjServer {
  constructor(val) {
    this.dep = new Dep()

    // 给数据加入一个属性'__ob__'，且这个属性为不可枚举的
    // this是这个类的实例，作用：给val添加一个属性'__ob__'，且这个属性对应的是这个ObjServer实例
    def(val, '__ob__', this, false)
    // 检查她是数组还是对象
    if(Array.isArray(val)){
      // 将数组实例val上身上的原型改为修改后的对象上，并没有改Array
      Object.setPrototypeOf(val, arrayMethods)
      // 这一步的目的是如果数组中有对象，就给对象加上ob
      this.observeArray(val)
      console.log(val);
    } else {
      this.walk(val)
    }
  }
  // 遍历
  walk(val) {
    for (const key in val) {
      // 给每个属性（部分类型）的set和get方法加入数据监听的逻辑
      defineReactive(val, key)
    }
  }
  // 给数组加上ob
  observeArray(arr) {
    for(let i = 0, len = arr.length; i < len; i++) {
      ob(arr[i])
    }
  }
}

 