
import { patch } from "./patch";
/**
 * 创建节点
 * @param {*} vnode 需要创建为节点的虚拟节点
 */
export function creeteElement(vnode) {
  // console.log(vnode);
  // 创建 dom 节点
  let domNode = document.createElement(vnode.sel)
  // 内容是文字
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) { // 子节点
    for (let i = 0; i < vnode.children.length; i++) {
      domNode.appendChild(creeteElement(vnode.children[i]))
    }
  }
  vnode.elm = domNode
  return domNode
}