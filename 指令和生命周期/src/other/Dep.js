/** 
 * 描述：消息管理员，又叫部门
 * 作用：用于存储订阅者并发布消息（通俗来讲：就是通过数据劫持，将订阅者存起，但触发数据改变时，就将变得的订阅者发给Watcher（监察者））
 * 这里的订阅者又叫依赖,就是watcher实例
*/
let uid = 0 // 基础id值，每一个数据被引用，都会有一个对应的 uid 作为标识符
export class Dep {
  id = 0 // 订阅者ID
  subs = [] // 存储订阅者的数组
  constructor() { 
    this.id = ++uid
  }
  // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
  depend() {
    // console.log('addSub', Dep.target);
    Dep.target.addDep(this) // 调用添加依赖方法
    // this.addSub(Dep.target)
  }
  // 添加依赖（又叫添加订阅者）
  addSub (sub) {
    // if (this.subs.length == 0  ) {
      this.subs.push(sub)
    // }
    // console.log('this.subs', this.subs);
     // 置空，用于下一个 Watcher 使用
  }
  // 发送通知
  notify() {
    // 通知所有订阅者（Watcher），触发订阅者的相应逻辑处理
    
    this.subs.forEach(sub => sub.update())
  }
}
 
 
// // 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
// Dep.target = null;
 
/**
 * 说明：
 * 一、如果不理解 Dep.target 的使用，可以看下面或 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target
 *     new.target属性允许你检测函数或构造方法是否通过是通过new运算符被调用的。
 *     在通过new运算符被初始化的函数或构造方法中，
 *     new.target返回一个指向构造方法或函数的引用。
 *     在普通的函数调用中，new.target 的值是undefined。
 * 
 * 二、上面的 depend 和 addSub 都是只在直接使用 Dep 的 target 来使用，
 *     这样就成全局可用，即只要有引入 Dep ，不用实例化，都可以通过 Dep.target 调用  depend 和  addSub，
 *     同时，所有依赖都会收集到统一一个全局变量中了
 *  */ 