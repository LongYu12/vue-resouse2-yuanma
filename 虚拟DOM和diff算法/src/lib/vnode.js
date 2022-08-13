/**
 * 描述 ： 生成 vnode  
 * @param {*} sel 
 * @param {*} data 
 * @param {*} children 
 * @param {*} text 
 * @param {*} elm 
 * @returns 
 */

export function vnode(
  sel = undefined,
  data = undefined,
  children = undefined,
  text = undefined,
  elm = undefined,
) {
  const key = data.key
  return {
    sel, data, key, children, text, elm
  }
}


// export function vnode(
//   sel: string | undefined,
//   data: any | undefined,
//   children: Array<VNode | string> | undefined,
//   text: string | undefined,
//   elm: Element | DocumentFragment | Text | undefined
// ): VNode {
//   const key = data === undefined ? undefined : data.key;
//   return { sel, data, children, text, elm, key };
// }
