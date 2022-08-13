import Dep from "./Dep";
let uid = 0
/**
 * Watcher是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方
 */
export default class Watcher{
  constructor(target, expression, callback) {
    console.log('我是Watcher',target,expression,callback);
    this.id = uid++
    // target监听的对象
    this.target = target
    // expression监听对象的属性,每个属性是用.分开
    // parsePath的实现逻辑详见下面
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
    
    // console.log(' Dep.target-----',  Dep.target);
  }
  update() {
    this.run()
  }
  get() {
    // 进入依赖收集阶段,让全局的Dep.target设置为Watcher本身,那么就是进入依赖收集阶段
    Dep.target = this
    let value
    const obj = this.target
     
    try{
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }

    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(callback) {
    const value = this.get()
    if(value != this.value || typeof value == 'object'){
      const oldValue = this.value
      this.value = value
      callback.call(this.target, value, oldValue)
    }
  }
} 

function parsePath(str) {
  let setgments = str.split('.')
  return (obj) => {
    for (let index = 0; index < setgments.length; index++) {
      if (!obj) return
      obj = obj[setgments[index]]
    }
    return obj
  }
}