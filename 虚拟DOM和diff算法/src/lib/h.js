import { vnode } from "./vnode"


// 学前知识：arguments 属性是一个数组，包含该函数的接收到的所有参数，记住是接收到的，按接收顺序排列
/**
 * @param {*} sel 
 * @param {*} data 
 * @param {*} c 
 */
export default function (sel, data, c) {
  // 检查参数的个数
  if (arguments.length != 3) {
    throw new Error("对不起，参数个数不对")
  }
  // 检查参数 c 的类型
  if (typeof c == 'string' || typeof c == 'number') {
    // 基本数据类型形态
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    let children = []
    //参数 c 是数组形态
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('出入的数组结果错误' + '\n' + c + '\n' + c[i])
      }
      // 收集
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    //参数 c 是对象形态，即：是函数 h()
    return vnode(sel, data, [c], undefined, undefined)
  } else {
    throw new Error("传入的参数类型不对")
  }
}