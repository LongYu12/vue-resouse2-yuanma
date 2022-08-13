
import Compile from "./Compile"
import { ob } from "../other/ob"
import { Watcher } from '../other/Watcher'


export default class Vue {
  constructor(options) {
    this.$options = options || {}
    // 绑定数据
    this._data = options.data || undefined
    
    // 数据变为响应式
    this._initData()
    ob(this._data)
    // 调用默认的 watch
    this._initWatch()
    this._initComputed()
    // 模板编译
    new Compile(options.el, this)
    
  }

  // 将数据做一个简单的数据响应式，其实 ob(this._data) 已经加上了，只是两边没有完美对接好
  _initData() {
    Object.keys(this._data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return this._data[key]
        },
        set(newVal) {
          this._data[key] = newVal
        }
      })
    })
  }

  _initComputed() { }

  // 对 data 中所有字段都进行订阅产生依赖
  _initWatch() {
    let watch = this.$options.watch || null
    Object.keys(watch).forEach(key => {
      new Watcher(this, key, watch[key])
    })
  }
}

