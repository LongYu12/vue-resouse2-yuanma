
import { checkSameVnode } from "./checkSameVnode";
import { patchVnode } from "./patchVnode";
import { creeteElement } from "./creeteElement";

/**
 * 更新子节点
 * @param {*} parentElm 父节点
 * @param {*} oldCh 旧子节点集合
 * @param {*} newCh 新子节点集合
 */
export function updatedChildren(parentElm, oldCh, newCh) {
  console.log('调用======updatedChildren');

  let oldStartIndex = 0 // 旧前
  let newStartIndex = 0 // 新前
  let oldEndIndex = oldCh.length - 1 // 旧后
  let newEndIndex = newCh.length - 1 // 新后
  let oldStartVnode = oldCh[0] // 旧前节点
  let newStartVnode = newCh[0] // 新前节点
  let oldEndtVnode = oldCh[oldEndIndex] // 旧后节点
  let newEndVnode = newCh[newEndIndex] // 新后节点
  let keyMap = null  // key缓存

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    console.log(oldStartIndex, oldEndIndex, newStartIndex, newEndIndex);
    if (oldStartVnode == null) {
      oldStartIndex++
    } else if (newStartVnode == null) {
      newStartIndex++
    } else if (oldEndtVnode == null) {
      oldEndIndex++
    } else if (newEndVnode == null) {
      newEndIndex++
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) { //新前与旧前
      console.log('//新前与旧前');
      patchVnode(oldStartVnode, newStartVnode)
      oldStartIndex++
      newStartIndex++
    } else if (checkSameVnode(oldEndtVnode, newEndVnode)) {// 新后与旧后
      console.log('// 新后与旧后');
      patchVnode(oldEndtVnode, newEndVnode)
      oldEndIndex--
      newEndIndex--
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {// 新后与旧前
      console.log('// 新后与旧前');
      patchVnode(oldStartVnode, newEndVnode)
      // oldCh[oldStartIndex] = undefined
      // 如何移动节点：插入已在 DOM 上的节点到 DOM 上，会把这个要插入的节点移动到插入点上，
      // 旧后添加
      parentElm.insertBefore(oldStartVnode.elm, oldEndtVnode.elm.nextSibling)//  使用nextSibling属性返回指定节点之后的下一个兄弟节点
      oldStartIndex++
      newEndIndex--
    } else if (checkSameVnode(oldEndtVnode, newStartVnode)) {// 新前与旧后
      console.log('// 新前与旧后');
      patchVnode(oldEndtVnode, newStartVnode)
      // oldCh[oldEndIndex] = undefined
      // 将新前指针指向的节点插入到旧前节点的dom前面
      parentElm.insertBefore(oldEndtVnode.elm, oldStartVnode.elm)// 旧前添加  
      newStartIndex++
      oldEndIndex--
    } else { // 均不符合上面的情况，进行数组遍历
      console.log(' // 均不符合上面的情况，进行数组遍历');
      // 寻找 key 的 map
      if (!keyMap) {
        keyMap = {}
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldCh[i].key
          if (key != undefined) {
            console.log('ss', key);
            keyMap[key] = i
          }
        }
      }
      console.log(keyMap, newStartVnode.key);
      let indexInOld = keyMap[newStartVnode.key]
      console.log('indexInOld', indexInOld, oldCh[indexInOld]);
      if (indexInOld == undefined) { // 说明是新增的
        parentElm.insertBefore(creeteElement(newStartVnode), oldStartVnode.elm)
      } else { // 如果找到就需要将旧的移位到
        parentElm.insertBefore(oldCh[indexInOld].elm, oldStartVnode.elm)
        patchVnode(oldCh[indexInOld], newStartVnode)
        oldCh[indexInOld] = null
      }
      newStartIndex++
    }

    oldStartVnode = oldCh[oldStartIndex] // 旧前节点
    newStartVnode = newCh[newStartIndex] // 新前节点
    oldEndtVnode = oldCh[oldEndIndex] // 旧后节点
    newEndVnode = newCh[newEndIndex] // 新后节点
    console.log(oldCh);
  }

  // 继续查询剩余新节点
  if (oldStartIndex <= oldEndIndex) {
    // 新节点处理完，但旧节点还有未处理的，说明剩余的压迫删除
    while (oldStartIndex <= oldEndIndex) {
      parentElm.removeChild(oldCh[oldStartIndex].elm)
      oldStartIndex++
    }
    console.log(newCh);
  }
  if (newStartIndex <= newEndIndex) {
    // 旧节点处理完，但新节点未处理完，说明有新的节点添加
    // 一下两种添加方式都对，第一种需要到 patchVnode 里面进行一些修改才能使用
    // 第一种方式
    // let before = newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].elm
     // 第二种方式
    let before = oldCh[oldEndIndex + 1] == null ? null : oldCh[oldEndIndex + 1].elm
    while (newStartIndex <= newEndIndex) {
      parentElm.insertBefore(creeteElement(newCh[newStartIndex]), before)//  使用nextSibling属性返回指定节点之后的下一个兄弟节点
      newStartIndex++
      console.log('新家');
    }
  }

}