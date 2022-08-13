import defineProperty from "./defineProperty";
import { arrayMethods } from './arrayMethods'
/**
 * 描述：监听者,监听对象属性值的变化
 * 作用就是给每个属性值添加新的 数据劫持
 */
import { Dep } from './Dep'
import { def } from './util'
import { ob } from "./ob";
export class Observer {
  constructor(value) {
    console.log(value);
    this.dep = new Dep()
    this.value = value
    def(value, '__ob__', this, false)
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  // 遍历属性值并监听
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]));
  }
  // 执行监听的具体方法
  convert(key, val) {
    defineProperty(this.value, key, val)
  }
  // 处理数组
  observeArray(arr) {
    for(let i = 0, len = arr.length; i < len; i++) {
      ob(arr[i])
    }
  }
}

