import h from './src/lib/h'
// console.log(h('div', {class: [{tt: true}]},[h('p',{},'你你你')]));
 
const vnode = h('div', {class: [{tt: true}]},[
  h('p',{},'有你的'),h('p',{},h('p',{class:{tt:true}},'三季报'))
])
console.log(vnode);



import { init } from 'snabbdom/build/init'
import { classModule } from 'snabbdom/build/modules/class' // 外联样式模块
import { propsModule } from 'snabbdom/build/modules/props'  // 属性模块
import { styleModule } from 'snabbdom/build/modules/style' // 内联样式模块
import { eventListenersModule } from 'snabbdom/build/modules/eventListeners' // 事件监听模块

// 创建 patch 函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
const app = document.getElementById('app')
patch(app, vnode)