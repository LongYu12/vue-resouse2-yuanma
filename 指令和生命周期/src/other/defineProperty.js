/***
 * 描述 defineProperty 劫持类的定义
 * @param objName:object 对象名
 * @param attributeName: string 属性名
 * @param data:{*} 添加的数据 默认为 ''
 * @returns 
 */
import { Dep } from "./Dep";
import { ob } from "./ob";
export default function defineProperty(objName, attributeName, data = null) {
  const dep = objName.__ob__.dep
  // 给当前属性的值添加监听
  let chlidOb = ob(data);
  Object.defineProperty(objName, attributeName, {
    configurable: true, // 该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
    enumerable: true, // 将这个属性暴露出去，允许被枚举到
    // 访问属性会调用
    get: () => {
      // console.log('我被访问了', objName, attributeName, data);
      // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
      // target指向一个Watcher实例，每个Watcher都是一个订阅者
      // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
      if (Dep.target) {
        dep.depend()
        if (chlidOb) {
          chlidOb.dep.depend();
        }
      }

      return data
    },
    set: (newVal) => {
      // console.log('我被修改了', attributeName, '旧的-', data, '  新的-', newVal);
      if (data === newVal) return
      // 对新值进行监听
      chlidOb = ob(data)
      data = newVal
      // console.log('触发sss', dep);
      dep.notify()
    }
  })
}


