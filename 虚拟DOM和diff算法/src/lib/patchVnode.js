import { creeteElement } from "./creeteElement";
import { updatedChildren } from "./updatedChildren";
/**
 * 同一个节点进行处理
 * @param {*} oldVnode 
 * @param {*} newVnode 
 * @returns 
 */
export function patchVnode(oldVnode, newVnode) {
  console.log('调用======patchVnode');
  if (oldVnode === newVnode) return

  // 新虚拟节点有没有 text 属性值
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // 新 vnode 有 text 属性
    console.log('新 vnode 有 text 属性',newVnode.text != oldVnode.text);
    newVnode.elm =  oldVnode.elm
    if (newVnode.text != oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text // innerText会把老节点的子节点全部覆盖掉，innerHTML也是这样有个效果
    }
  } else {//新的没有 text 属性值,但有 children
    // 判断旧 vnode 有没有 children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {//新旧 vnode 有 children
      updatedChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {// 旧 vnode 没有 children，新的 vonde 有 children
      // 清空老节点的内容
      oldVnode.elm.innerHTML = ''
      newVnode.children.forEach(item => {
        let newDom = creeteElement(item)
        oldVnode.elm.appendChild(newDom)
      });
    }
  }
}




/* //新旧 vnode 有 children
let unTreat = 0 //所有未处理的索引
for (let i = 0; i < newVnode.children.length; i++) {
  let ch = newVnode.children[i]
  let isExist = false // 是否在旧节点已存在

  for (let j = 0; j < oldVnode.children.length; j++) {
    let oldch = oldVnode.children[j]
    if (ch.sel == oldch.sel && ch.key == oldch.key) {
      isExist = true
    }
  }

  if (!isExist) { // 不存在，说明是新增的节点
    let newDom = creeteElement(ch)
    console.log('新节点', ch, newDom, unTreat);
    if (unTreat < oldVnode.children.length) {// 在中间插入新节点
      oldVnode.elm.insertBefore(newDom, oldVnode.children[unTreat].elm)
    } else {// 在末尾插入新节点
      oldVnode.elm.appendChild(newDom)
    }
  } else {
    unTreat++

  }

}   */