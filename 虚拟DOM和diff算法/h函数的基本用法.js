import './index.css'
// h函数的基本使用

import { init } from 'snabbdom/build/init'
import { classModule } from 'snabbdom/build/modules/class' // 外联样式模块
import { propsModule } from 'snabbdom/build/modules/props'  // 属性模块
import { styleModule } from 'snabbdom/build/modules/style' // 内联样式模块
import { eventListenersModule } from 'snabbdom/build/modules/eventListeners' // 事件监听模块
import { h } from 'snabbdom/build/h'

// 创建 patch 函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

/**
 * h函数
 * 第一个参数：标签名称
 * 第二个参数：标签上的属性（选填）、类名
 * 第三个参数：标签包含的内容（选填）,填了，就是双标签,也可以是数组，数组情况下，是可以嵌套的(但是如果数组只有一个元素，可以省略，)
 */
// 创建虚拟节点
// const vnode = h('a',{props: {
//   href:'http://www.baidu.com'}
// }, '一度')
// const vnode = h('input', {
//   props: {
//     value:'你好' ,
//     type:'number',
//   },
//   class: {'tt':true}
// })


// h 函数的嵌套模式
const vnode = h('div', {
  class: {'tt':true}
}, [
  h('input', { props: {value:'你好' ,}}),
  h('p', '我是谁？')
])
console.log(vnode);
// 将虚拟节点挂在 dom 树上
const app = document.getElementById('app')
patch(app, vnode)

// const vnode2 = h('div', {
//   class: {'tt':true}
// }, [
//   h('input', { props: {value:'你好' ,}}),
//   h('p', 'sssss？')
// ])
// setTimeout(()=>{
//   patch(vnode, vnode2)
//   console.log(vnode);
// }, 3000)

/* 

// h 函数的所有使用案例、
  h('div')
  h('div', '文字'),
  h('div', [多个h函数])
  h('div', h())

// 本项目实现的是下面三个格式
  h('div',{}, '文字'),
  h('div',{}, [多个h函数])
  h('div',{}, h()) 

*/


