
/**
 * 判断两个节点是否为同一节点
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export function checkSameVnode(a, b) {
  console.log(a.sel , b.sel , a.key , b.key);
  return a.sel == b.sel && a.key == b.key
}