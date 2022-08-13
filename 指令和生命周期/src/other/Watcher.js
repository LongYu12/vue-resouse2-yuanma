import { Dep } from "./Dep"
let uid = 0
/***
 * 描述： Watcher 观察者
 * @param vm 被订阅的数据一定来自于当前Vue实例
 * @param expOrFn 被订阅的数据
 * @param cb 当数据更新时想要做的事情
 */
export  class Watcher {
  constructor(vm, expOrFn, cb) {
    this.depIds  = {} // hash存储订阅者id，避免重复的订阅者
    this.vm = vm // 被订阅的数据一定来自于当前Vue实例
    this.cb = cb // 当前数据更新是要做的事情
    this.expOrFn = expOrFn // 被订阅的数据
    this.val = this.get() // 维护更新之前的数据
    this.id = (uid++) + 'Watcher'
    console.log('llll', this.val);
  }
  // 对外暴露的接口，用于再订阅数据被更新时，有订阅者管理员（Dep）调用
  update() {
    this.run()
  }
  addDep(dep) {
    // 如果再 depIds 的 hash 中没有当前的 id，可以判断时新 Watcher， 因此可以添加到 dep 的数组中存储
    // 此判断是避免同 id 的 watcher 被被多次存储
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
    
  }
  run() {
    const val = this.get()
    const oldVal = this.val
    if(val != this.val) {
      this.val = val
      this.cb.call(this.vm, val, oldVal)
    }
  }
  get() {
    // 当前订阅者（Watcher）读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
    Dep.target = this
    // console.log('sss', this.vm);
    let pa = this.expOrFn.split('.')
    let tem = this.vm._data
    for (let index = 0; index <  pa.length; index++) {
      tem = tem[pa[index]]
      // console.log('llllll', pa[index] ,tem);
    }
    const val = JSON.parse(JSON.stringify(tem)) //使用深拷贝的方式（目前这种方式确定比较多）  通过 vue 实例获取实例中的数据，而这一步会用到 Dep.target
    Dep.target = null
    return val
  }
}