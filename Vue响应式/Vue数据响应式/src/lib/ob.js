import ObjServer from './ObjServer'
// 作用：给数据加上ObjServer

export const ob = function (val) {
  if (typeof val != 'object') return
  if (typeof val.__ob__ !== 'undefined') {
    return val.__ob__
  } else {
    return new ObjServer(val)
  }
}