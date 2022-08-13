import { Watcher } from "./Watcher";
import { ob } from "./ob";
export class Vue {
  constructor(options = {}) {
    if (!('data' in options)) return
    // 简化了 $options 处理
    this.$options = options
    // 简化了对 data 得处理
    let data = (this._data = this.$options.data)
    // 将所有 data 最外层属性代理到 Vue 实例上
    Object.keys(data).forEach(key => this._proxy(key))
    // 监听数据
    ob(data);
  }
  // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb);
  }
  _proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: val => {
        this._data[key] = val;
      },
    });
  }

}