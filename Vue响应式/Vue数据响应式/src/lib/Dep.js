let uid = 0

export default class Dep{
  constructor() {
    this.id = ++uid
    console.log('我是Dep');
    // 用数组存储自己的订阅者subs,即Watcher的实例
    this.subs = []
  }
  // 添加订阅
  addSub(sub){
    if (this.subs.length ==0 || this.subs.some(item => item.id != sub.id)) {
      this.subs.push(sub)
    }
  }
  // 添加依赖
  depend() {
    // Dep.target就是自己指定的全局的位置,使用window.target也行
    // 只要是全局唯一,没有歧义就行
    // Dep.target不存在是为null
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  notify() {
    // 浅克隆一份
    console.log('浅克隆一份notify', this.subs, Dep.target);
    const subs = this.subs.slice()
    for (let index = 0, len = subs.length; index < len; index++) {
      subs[index].update()
    }
  }
}