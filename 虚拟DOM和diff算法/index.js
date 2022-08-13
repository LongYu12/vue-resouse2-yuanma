


import { patch } from "./src/lib/patch";
import h from './src/lib/h'
// const vnode = h(
//   'ul', 
//   { class: [{ tt: true },], key: 'ff' }, 
//   [
//     h('li', {key: 'cc' }, '有你的'), 
//     h('li', {key: 'aa'}, h('p', { class: { tt: true } ,key: 'ic'}, '三季报'))
//   ]
// )
const vnode = h(
  'div',
  { class: [{ tt: true },], key: 'ff' },
  [
    h('li', { key: '22' }, '222'),
    h('li', { key: 'cc' }, '外网'),
    h('li', { key: '55' }, '555'),
    // h('li', { key: 'cwc' }, '第三个'), 


  ]
)
const app = document.getElementById('app')
patch(app, vnode)
console.log('vnode', vnode);

setTimeout(() => {
  // const vnode2 = h(
  //   'ul', 
  //   { class: [{ tt: true },], key: 'ff' }, 
  //   [
  //     h('li', {key: 'cc' }, '外网'), 
  //     h('li', {key: 'aa'}, h('h1', { class: { tt: true } ,key: 'ic'}, '三季报'))
  //   ]
  // )
  const vnode2 = h(
    'div',
    { class: [{ tt: true },], key: 'ff' },
    [
      h('li', { key: 'cc' }, '新2 外网'),
      h('li', { key: '22' }, '22222'),
      h('li', { key: '55' }, '新1 555'),
      h('li', { key: '新6666' }, '新6666 555'),
      h('li', { key: 'cwc' }, '第三个'),
      h('li', { key: '232' }, '22cs'),

    ]
  )
  patch(vnode, vnode2)
}, 2000)

