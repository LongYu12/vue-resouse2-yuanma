export  function def(obj, key, value, enumerable) {
  // console.log(obj,key,value);
  Object.defineProperty(obj, key, {
    value,
    enumerable, // 是否可被枚举
    writable: true, // 是否可悲修改
    configurable: true, // 是否可被配置
  })
}