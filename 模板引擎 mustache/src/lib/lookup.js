

/**
 * 描述：处理嵌套对象的获取最底层对象的数据
 * @param {object} obj  传入的对象 原始对象
 * @param {*} keyname 传入的字符串比如 person.name
 */

export default function lookup(obj, keyname) {
  // 对 data 数据中普通数组的处理
  if (keyname != '.') {
    return keyname.split('.').reduce((pre, key) => {
      return pre[key]
    }, obj)
  }
  return obj[keyname]
}