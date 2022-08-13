

import { vnode } from "./vnode"
import { creeteElement } from "./creeteElement";
import { patchVnode } from "./patchVnode";
/**
 * 
 * @param {*} oldVnode 
 * @param {*} newVnode 
 */
export function patch(oldVnode, newVnode) {
  // 判断第一个参数，是 DO M节点还是 Vnode（虚拟）节点
  if (!oldVnode.hasOwnProperty('sel')) {
    /**
     * oldVnode 是 Dom 节点
     * tagName 是节点名称
     * toLowerCase() 将大写转换未小写
     */
    console.log('新的', oldVnode.hasOwnProperty(oldVnode));
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  console.log(oldVnode, newVnode);
  // 判断 oldVnode, newVnode 是否是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // 同一个节点
    console.log('同一个节点');
    patchVnode(oldVnode, newVnode)
  } else {
    console.log('不是同一个节点', newVnode);
    let newVnodeElm = creeteElement(newVnode)
    let isRoot = oldVnode.elm.parentNode === document.getElementsByTagName('body')[0] // 是否是根节点
    if (oldVnode.elm.parentNode && newVnodeElm) {
      // 插入到老节点之前
      if (isRoot) {
        oldVnode.elm.innerHTML = ""
        oldVnode.elm.appendChild(newVnodeElm)
      } else {
        oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        // 情况旧的子节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
      }
    }
  }
}